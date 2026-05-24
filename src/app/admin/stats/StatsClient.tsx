'use client';

import Link from 'next/link';
import { useState } from 'react';

interface DailyRow {
  report_date: string;
  visitor_count: number;
  quiz_solved_count: number;
}

interface PageRow {
  page_path: string;
  visit_count: number;
  unique_visitors: number;
}

interface LangRow {
  lang: string;
  unique_visitors: number;
  page_views: number;
}

interface StatsClientProps {
  daily: DailyRow[];
  pages: PageRow[];
  langs: LangRow[];
  totalVisitors: number;
  totalQuizzes: number;
  todayVisitors: number;
  todayQuizzes: number;
}

function Sparkline({ data, color = '#722f37' }: { data: number[]; color?: string }) {
  if (data.length < 2) return <svg width="120" height="32" />;
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120;
  const h = 32;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  const pathD = 'M ' + pts.join(' L ');
  const areaD = `M 0,${h} L ${pathD.slice(2)} L ${w},${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#sg-${color.replace('#', '')})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BarChart({ data, max }: { data: { label: string; value: number }[]; max: number }) {
  return (
    <div className="bar-chart">
      {data.map((d, i) => (
        <div key={i} className="bar-row">
          <span className="bar-label">{d.label}</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${max > 0 ? (d.value / max) * 100 : 0}%` }} />
          </div>
          <span className="bar-value">{d.value}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <div className="donut-empty">No data</div>;
  let offset = 0;
  const r = 40;
  const circ = 2 * Math.PI * r;
  const paths = segments.map((seg) => {
    const pct = seg.value / total;
    const dash = pct * circ;
    const gap = circ - dash;
    const path = (
      <circle
        key={seg.label}
        cx="50" cy="50" r={r}
        fill="none"
        stroke={seg.color}
        strokeWidth="18"
        strokeDasharray={`${dash} ${gap}`}
        strokeDashoffset={-offset * circ}
        strokeLinecap="butt"
      />
    );
    offset += pct;
    return path;
  });
  return (
    <div className="donut-wrap">
      <svg viewBox="0 0 100 100" width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border-light)" strokeWidth="18" />
        {paths}
      </svg>
      <div className="donut-legend">
        {segments.map((seg) => (
          <div key={seg.label} className="legend-row">
            <span className="legend-dot" style={{ background: seg.color }} />
            <span className="legend-label">{seg.label}</span>
            <span className="legend-pct">{total > 0 ? Math.round((seg.value / total) * 100) : 0}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StatsClient({
  daily,
  pages,
  langs,
  totalVisitors,
  totalQuizzes,
  todayVisitors,
  todayQuizzes,
}: StatsClientProps) {
  const [tab, setTab] = useState<'overview' | 'pages' | 'history'>('overview');

  const visitorData = [...daily].reverse().map((d) => d.visitor_count);
  const quizData = [...daily].reverse().map((d) => d.quiz_solved_count);

  const engagementRate =
    totalVisitors > 0 ? (totalQuizzes / totalVisitors).toFixed(1) : '0';

  const langSegments = [
    { label: '한국어', value: langs.find((l) => l.lang === 'ko')?.unique_visitors ?? 0, color: '#722f37' },
    { label: 'English', value: langs.find((l) => l.lang === 'en')?.unique_visitors ?? 0, color: '#C5903A' },
    { label: 'Unknown', value: langs.find((l) => l.lang === 'unknown')?.unique_visitors ?? 0, color: '#B0ADA8' },
  ].filter((s) => s.value > 0);

  const topPages = pages.slice(0, 10);
  const maxPageVisits = topPages[0]?.visit_count ?? 1;

  // Drop-off: pages sorted by visit count with home as baseline
  const homeVisits = pages.find((p) => p.page_path === '/')?.visit_count ?? 1;
  const dropoffPages = pages
    .filter((p) => p.page_path !== '/')
    .map((p) => ({
      ...p,
      dropoff_pct: Math.max(0, Math.round((1 - p.visit_count / homeVisits) * 100)),
    }))
    .sort((a, b) => a.visit_count - b.visit_count)
    .slice(0, 5);

  return (
    <div className="sa-layout">
      <header className="sa-header">
        <div className="sa-header-left">
          <Link href="/admin" className="sa-back">← Admin</Link>
          <h1 className="sa-title">Analytics</h1>
          <p className="sa-subtitle">Eclavin Quiz — Real-time visitor & engagement tracking</p>
        </div>
        <div className="sa-header-right">
          <div className="sa-live-dot" />
          <span className="sa-live-label">Live</span>
        </div>
      </header>

      {/* KPI Bar */}
      <div className="sa-kpi-grid">
        <KpiCard
          label="Total Visitors (All Time)"
          value={totalVisitors}
          sub="Unique fingerprints"
          spark={<Sparkline data={visitorData} color="#722f37" />}
          accent="#722f37"
        />
        <KpiCard
          label="Total Quizzes Solved"
          value={totalQuizzes}
          sub="All quiz attempts"
          spark={<Sparkline data={quizData} color="#C5903A" />}
          accent="#C5903A"
        />
        <KpiCard
          label="Today's Visitors"
          value={todayVisitors}
          sub="Unique today (KST)"
          accent="#1F6F4C"
        />
        <KpiCard
          label="Engagement Rate"
          value={engagementRate}
          sub="Quizzes per visitor"
          accent="#5B5AE0"
          suffix="q/v"
        />
      </div>

      {/* Tabs */}
      <div className="sa-tabs">
        {(['overview', 'pages', 'history'] as const).map((t) => (
          <button
            key={t}
            className={`sa-tab ${tab === t ? 'active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t === 'overview' ? '📊 Overview' : t === 'pages' ? '📄 Pages' : '📅 History'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === 'overview' && (
        <div className="sa-section-grid">
          {/* Language Distribution */}
          <div className="sa-card">
            <h2 className="sa-card-title">Language Distribution</h2>
            <DonutChart segments={langSegments} />
          </div>

          {/* Drop-off Analysis */}
          <div className="sa-card">
            <h2 className="sa-card-title">Drop-off Analysis</h2>
            <p className="sa-card-desc">Pages with least visits (relative to homepage)</p>
            {dropoffPages.length > 0 ? (
              <div className="dropoff-list">
                {dropoffPages.map((p) => (
                  <div key={p.page_path} className="dropoff-row">
                    <span className="dropoff-path">{p.page_path}</span>
                    <div className="dropoff-bar-wrap">
                      <div className="dropoff-bar" style={{ width: `${100 - p.dropoff_pct}%` }} />
                    </div>
                    <span className="dropoff-pct" style={{ color: p.dropoff_pct > 70 ? '#A31B12' : 'var(--text-secondary)' }}>
                      {p.dropoff_pct}% less
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="sa-empty">Not enough data yet</p>
            )}
          </div>

          {/* Daily Trend Mini Chart */}
          <div className="sa-card sa-card-wide">
            <h2 className="sa-card-title">30-Day Visitor Trend</h2>
            <MiniLineChart daily={daily} />
          </div>
        </div>
      )}

      {tab === 'pages' && (
        <div className="sa-card sa-card-full">
          <h2 className="sa-card-title">Top Pages by Traffic</h2>
          <BarChart
            data={topPages.map((p) => ({ label: p.page_path, value: p.visit_count }))}
            max={maxPageVisits}
          />
        </div>
      )}

      {tab === 'history' && (
        <div className="sa-card sa-card-full">
          <h2 className="sa-card-title">Daily History — Last 30 Days</h2>
          <div className="sa-table-wrap">
            <table className="sa-table">
              <thead>
                <tr>
                  <th>Date (KST)</th>
                  <th>Unique Visitors</th>
                  <th>Quizzes Solved</th>
                  <th>Engagement</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {daily.map((row) => {
                  const rate = row.visitor_count > 0
                    ? (row.quiz_solved_count / row.visitor_count).toFixed(1)
                    : '0';
                  const isToday = row.report_date === daily[0]?.report_date;
                  return (
                    <tr key={row.report_date} className={isToday ? 'row-today' : ''}>
                      <td className="td-date">
                        {row.report_date}
                        {isToday && <span className="today-badge">Today</span>}
                      </td>
                      <td className="td-num">{row.visitor_count}</td>
                      <td className="td-num">{row.quiz_solved_count}</td>
                      <td className="td-num">{rate} q/v</td>
                      <td>
                        <div className="inline-bar">
                          <div
                            className="inline-bar-fill"
                            style={{ width: `${Math.min(100, row.visitor_count * 10)}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {daily.length === 0 && (
                  <tr>
                    <td colSpan={5} className="td-empty">No data yet — events will appear here as visitors arrive</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style jsx>{`
        .sa-layout {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          padding: 3rem;
          max-width: 1400px;
          margin: 0 auto;
          font-family: var(--font-inter, 'SUIT', sans-serif);
        }
        .sa-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-light);
        }
        .sa-back {
          display: inline-block;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          margin-bottom: 0.75rem;
          transition: color 0.2s;
        }
        .sa-back:hover { color: var(--text-primary); }
        .sa-title {
          font-size: 3rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          margin: 0;
          line-height: 1;
        }
        .sa-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
          margin: 0.5rem 0 0;
        }
        .sa-header-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .sa-live-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.05); }
        }
        .sa-live-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #22c55e;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* KPI Cards */
        .sa-kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 1100px) {
          .sa-kpi-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .sa-layout { padding: 1.5rem; }
          .sa-kpi-grid { grid-template-columns: 1fr; }
          .sa-title { font-size: 2rem; }
        }

        /* Tabs */
        .sa-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 0;
        }
        .sa-tab {
          padding: 0.75rem 1.5rem;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          transition: all 0.2s;
          border-radius: 8px 8px 0 0;
        }
        .sa-tab:hover { color: var(--text-primary); }
        .sa-tab.active {
          color: var(--text-primary);
          border-bottom-color: #722f37;
          background: var(--bg-secondary);
        }

        /* Cards */
        .sa-section-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .sa-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          border-radius: 24px;
          padding: 2rem;
        }
        .sa-card-wide { grid-column: 1 / -1; }
        .sa-card-full { width: 100%; }
        .sa-card-title {
          font-size: 1.1rem;
          font-weight: 800;
          margin: 0 0 1.25rem;
          letter-spacing: -0.02em;
        }
        .sa-card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin: -0.75rem 0 1rem;
        }
        .sa-empty { color: var(--text-secondary); font-size: 0.9rem; }

        /* Bar Chart */
        :global(.bar-chart) {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        :global(.bar-row) {
          display: grid;
          grid-template-columns: 200px 1fr 50px;
          align-items: center;
          gap: 1rem;
        }
        :global(.bar-label) {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        :global(.bar-track) {
          height: 8px;
          background: var(--border-light);
          border-radius: 4px;
          overflow: hidden;
        }
        :global(.bar-fill) {
          height: 100%;
          background: linear-gradient(90deg, #722f37, #C5903A);
          border-radius: 4px;
          transition: width 0.8s cubic-bezier(0.4,0,0.2,1);
        }
        :global(.bar-value) {
          font-size: 0.85rem;
          font-weight: 700;
          text-align: right;
        }

        /* Donut */
        :global(.donut-wrap) {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        :global(.donut-empty) {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        :global(.donut-legend) {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        :global(.legend-row) {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        :global(.legend-dot) {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        :global(.legend-label) {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          flex: 1;
        }
        :global(.legend-pct) {
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--text-secondary);
        }

        /* Drop-off */
        .dropoff-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .dropoff-row {
          display: grid;
          grid-template-columns: 1fr 100px 70px;
          align-items: center;
          gap: 0.75rem;
        }
        .dropoff-path {
          font-size: 0.8rem;
          color: var(--text-secondary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 600;
        }
        .dropoff-bar-wrap {
          height: 6px;
          background: var(--border-light);
          border-radius: 3px;
          overflow: hidden;
        }
        .dropoff-bar {
          height: 100%;
          background: #722f37;
          border-radius: 3px;
        }
        .dropoff-pct {
          font-size: 0.78rem;
          font-weight: 700;
          text-align: right;
        }

        /* Table */
        .sa-table-wrap {
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid var(--border-light);
        }
        .sa-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          background: var(--bg-secondary);
        }
        .sa-table th {
          padding: 1rem 1.25rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-light);
          font-weight: 800;
        }
        .sa-table td {
          padding: 0.9rem 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          font-size: 0.95rem;
        }
        .sa-table tr:last-child td { border-bottom: none; }
        .row-today td { background: rgba(114, 47, 55, 0.04); }
        .td-date { font-weight: 700; }
        .td-num { font-variant-numeric: tabular-nums; font-weight: 600; }
        .td-empty { text-align: center; color: var(--text-secondary); padding: 3rem; }
        .today-badge {
          margin-left: 0.5rem;
          font-size: 0.7rem;
          background: #722f37;
          color: white;
          padding: 0.15rem 0.5rem;
          border-radius: 999px;
          font-weight: 700;
          vertical-align: middle;
        }
        .inline-bar {
          height: 6px;
          width: 80px;
          background: var(--border-light);
          border-radius: 3px;
          overflow: hidden;
        }
        .inline-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #722f37, #C5903A);
          border-radius: 3px;
        }
      `}</style>

      <style jsx global>{`
        #app-wrapper {
          max-width: 100% !important;
          background-color: var(--bg-primary) !important;
        }
        body { display: block !important; overflow-x: hidden; }
      `}</style>
    </div>
  );
}

function KpiCard({
  label, value, sub, spark, accent, suffix,
}: {
  label: string;
  value: number | string;
  sub: string;
  spark?: React.ReactNode;
  accent: string;
  suffix?: string;
}) {
  return (
    <div className="kpi-card">
      <div className="kpi-top">
        <p className="kpi-label">{label}</p>
        {spark && <div className="kpi-spark">{spark}</div>}
      </div>
      <p className="kpi-value" style={{ color: accent }}>
        {value}{suffix && <span className="kpi-suffix">{suffix}</span>}
      </p>
      <p className="kpi-sub">{sub}</p>
      <style jsx>{`
        .kpi-card {
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          border-radius: 24px;
          padding: 1.75rem;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .kpi-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px -8px rgba(0,0,0,0.1);
        }
        .kpi-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        .kpi-label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-secondary);
          margin: 0;
          max-width: 140px;
          line-height: 1.4;
        }
        .kpi-spark { flex-shrink: 0; }
        .kpi-value {
          font-size: 2.75rem;
          font-weight: 900;
          letter-spacing: -0.04em;
          margin: 0;
          line-height: 1;
        }
        .kpi-suffix {
          font-size: 1rem;
          font-weight: 600;
          margin-left: 0.25rem;
          opacity: 0.6;
        }
        .kpi-sub {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          margin: 0.5rem 0 0;
        }
      `}</style>
    </div>
  );
}

function MiniLineChart({ daily }: { daily: DailyRow[] }) {
  const rows = [...daily].reverse().slice(-14); // last 14 days
  if (rows.length < 2) return <p className="sa-empty">Collecting data…</p>;

  const maxV = Math.max(...rows.map((r) => r.visitor_count), 1);
  const maxQ = Math.max(...rows.map((r) => r.quiz_solved_count), 1);
  const W = 800;
  const H = 120;
  const pad = 10;

  const toPoint = (idx: number, val: number, maxVal: number) => {
    const x = pad + (idx / (rows.length - 1)) * (W - pad * 2);
    const y = H - pad - (val / maxVal) * (H - pad * 2);
    return { x, y };
  };

  const vPts = rows.map((r, i) => toPoint(i, r.visitor_count, maxV));
  const qPts = rows.map((r, i) => toPoint(i, r.quiz_solved_count, maxQ));

  const makePath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', overflow: 'visible' }}>
        <defs>
          <linearGradient id="vGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#722f37" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#722f37" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="qGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C5903A" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#C5903A" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line key={t} x1={pad} y1={pad + t * (H - pad * 2)} x2={W - pad} y2={pad + t * (H - pad * 2)}
            stroke="var(--border-light)" strokeWidth="1" />
        ))}
        {/* Visitor area */}
        <path
          d={`${makePath(vPts)} L ${vPts[vPts.length - 1].x} ${H} L ${vPts[0].x} ${H} Z`}
          fill="url(#vGrad)"
        />
        <path d={makePath(vPts)} fill="none" stroke="#722f37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Quiz area */}
        <path
          d={`${makePath(qPts)} L ${qPts[qPts.length - 1].x} ${H} L ${qPts[0].x} ${H} Z`}
          fill="url(#qGrad)"
        />
        <path d={makePath(qPts)} fill="none" stroke="#C5903A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 3" />
        {/* Data points */}
        {vPts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#722f37" />
        ))}
        {/* X-axis labels */}
        {rows.map((r, i) => {
          if (i % Math.ceil(rows.length / 7) !== 0) return null;
          const p = toPoint(i, 0, 1);
          return (
            <text key={i} x={p.x} y={H + 16} textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
              {r.report_date.slice(5)}
            </text>
          );
        })}
      </svg>
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem' }}>
        <span style={{ fontSize: '0.8rem', color: '#722f37', fontWeight: 700 }}>━ Visitors</span>
        <span style={{ fontSize: '0.8rem', color: '#C5903A', fontWeight: 700 }}>╌ Quizzes Solved</span>
      </div>
    </div>
  );
}

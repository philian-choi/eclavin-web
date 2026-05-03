'use client';

import Link from 'next/link';
import { logoutAction } from './actions';

interface DashboardClientProps {
  l1_ko: any[];
  l1_en: any[];
  l2_ko: any[];
  l2_en: any[];
}

export default function DashboardClient({ l1_ko, l1_en, l2_ko, l2_en }: DashboardClientProps) {
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="header-left">
          <h1>Eclavin Editor</h1>
          <p>Manage your wine quiz database</p>
        </div>
        <div className="header-actions">
          <Link href="/admin/stats" className="btn-secondary">Analytics</Link>
          <Link href="/" className="btn-secondary">View Site</Link>
          <form action={logoutAction}>
            <button type="submit" className="btn-logout">Logout</button>
          </form>
        </div>
      </header>

      <main className="admin-main">
        <div className="dashboard-grid">
          <EpisodeSection title="Level 1" ko={l1_ko} en={l1_en} level={1} />
          <EpisodeSection title="Level 2" ko={l2_ko} en={l2_en} level={2} />
        </div>
      </main>

      <style jsx global>{`
        #app-wrapper {
          max-width: 100% !important;
          background-color: var(--bg-primary) !important;
        }
        body {
          display: block !important;
          overflow-x: hidden;
        }
      `}</style>

      <style jsx>{`
        .admin-layout {
          min-height: 100vh;
          background: var(--bg-primary);
          color: var(--text-primary);
          padding: 3rem;
          width: 100%;
          max-width: 1800px;
          margin: 0 auto;
        }
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 4rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--border-light);
        }
        .admin-header h1 {
          font-size: 3rem;
          font-weight: 900;
          margin: 0;
          letter-spacing: -0.03em;
        }
        .admin-header p {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin: 0.5rem 0 0 0;
        }
        .header-actions {
          display: flex;
          gap: 1.25rem;
          align-items: center;
        }
        .btn-secondary {
          padding: 0.8rem 1.5rem;
          border-radius: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          text-decoration: none;
          font-size: 1rem;
          font-weight: 700;
          transition: all 0.2s;
        }
        .btn-secondary:hover {
          background: var(--border-light);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .btn-logout {
          padding: 0.8rem 1.5rem;
          border-radius: 12px;
          background: transparent;
          border: 1px solid rgba(255, 0, 0, 0.2);
          color: #ff4d4d;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 700;
          transition: all 0.2s;
        }
        .btn-logout:hover {
          background: rgba(255, 0, 0, 0.05);
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }
        @media (max-width: 1200px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

function EpisodeSection({ title, ko, en, level }: any) {
  return (
    <section className="level-section">
      <h2 className="section-title">{title}</h2>
      <div className="lang-container">
        <div className="lang-column">
          <div className="lang-header">
             <span className="lang-dot ko"></span>
             <h3>Korean</h3>
          </div>
          <div className="ep-grid">
            {ko.map((ep: any) => (
              <EpisodeCard key={ep.id} ep={ep} level={level} lang="ko" />
            ))}
          </div>
        </div>
        <div className="lang-column">
          <div className="lang-header">
             <span className="lang-dot en"></span>
             <h3>English</h3>
          </div>
          <div className="ep-grid">
            {en.map((ep: any) => (
              <EpisodeCard key={ep.id} ep={ep} level={level} lang="en" />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .level-section {
          background: var(--bg-secondary);
          padding: 3rem;
          border-radius: 32px;
          border: 1px solid var(--border-light);
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.07);
        }
        .section-title {
          font-size: 2.25rem;
          font-weight: 900;
          margin-bottom: 2.5rem;
          color: var(--text-primary);
        }
        .lang-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }
        .lang-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding-left: 0.25rem;
        }
        .lang-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .lang-dot.ko { background: #3b82f6; }
        .lang-dot.en { background: #ef4444; }
        h3 {
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-secondary);
          margin: 0;
          font-weight: 800;
        }
        .ep-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
          gap: 1rem;
        }
      `}</style>
    </section>
  );
}

function EpisodeCard({ ep, level, lang }: any) {
  return (
    <Link href={`/admin/edit/${level}/${lang}/${ep.id}`} className="ep-card">
      {ep.number}
      <style jsx>{`
        .ep-card {
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          border-radius: 16px;
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--text-primary);
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .ep-card:hover {
          background: var(--accent-primary, #722f37);
          color: white;
          border-color: var(--accent-primary, #722f37);
          transform: scale(1.15) translateY(-4px);
          box-shadow: 0 10px 20px rgba(114, 47, 55, 0.3);
          z-index: 10;
        }
      `}</style>
    </Link>
  );
}

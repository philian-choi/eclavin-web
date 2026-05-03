import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import { isAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Eclavin Analytics Dashboard',
  robots: 'noindex, nofollow',
};

async function getStats() {
  const { data, error } = await supabase
    .from('daily_dashboard_stats')
    .select('*')
    .order('report_date', { ascending: false })
    .limit(30);
  
  if (error) {
    console.error('Error fetching stats:', error);
    return [];
  }
  return data;
}

export default async function AdminStatsPage() {
  if (!(await isAdmin())) {
    redirect('/admin/login');
  }
  const stats = await getStats();

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', fontFamily: 'var(--font-inter)' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '2px solid var(--border-light)', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Eclavin Analytics</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Daily visitor and quiz interaction tracking</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="stat-card" style={{ padding: '1.5rem', borderRadius: '16px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Total Visitors Today</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>{stats[0]?.visitor_count || 0}</p>
        </div>
        <div className="stat-card" style={{ padding: '1.5rem', borderRadius: '16px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Quizzes Solved Today</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 800 }}>{stats[0]?.quiz_solved_count || 0}</p>
        </div>
      </div>

      <section>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Daily History (Last 30 Days)</h2>
        <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: 'var(--bg-secondary)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Date</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Visitors (Unique)</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Quizzes Solved</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Engagement Rate</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((row: any) => {
                const rate = row.visitor_count > 0 ? (row.quiz_solved_count / row.visitor_count).toFixed(1) : 0;
                return (
                  <tr key={row.report_date} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{row.report_date}</td>
                    <td style={{ padding: '1rem' }}>{row.visitor_count}</td>
                    <td style={{ padding: '1rem' }}>{row.quiz_solved_count}</td>
                    <td style={{ padding: '1rem' }}>{rate} questions/visitor</td>
                  </tr>
                );
              })}
              {stats.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No data available yet. Tracking is starting now!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
        Eclavin Internal Dashboard
      </footer>
    </div>
  );
}

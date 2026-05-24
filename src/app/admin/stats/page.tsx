import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import { isAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import StatsClient from './StatsClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Eclavin Analytics Dashboard',
  robots: 'noindex, nofollow',
};

async function getAllData() {
  const [dailyRes, pagesRes, langsRes] = await Promise.all([
    supabase
      .from('daily_dashboard_stats')
      .select('*')
      .order('report_date', { ascending: false })
      .limit(30),
    supabase
      .from('page_visit_stats')
      .select('*')
      .order('visit_count', { ascending: false })
      .limit(20),
    supabase
      .from('language_stats')
      .select('*'),
  ]);

  return {
    daily: dailyRes.data ?? [],
    pages: pagesRes.data ?? [],
    langs: langsRes.data ?? [],
  };
}

export default async function AdminStatsPage() {
  if (!(await isAdmin())) {
    redirect('/admin/login');
  }

  const { daily, pages, langs } = await getAllData();

  const totalVisitors = daily.reduce((sum: number, d: any) => sum + (d.visitor_count ?? 0), 0);
  const totalQuizzes = daily.reduce((sum: number, d: any) => sum + (d.quiz_solved_count ?? 0), 0);
  const todayVisitors = daily[0]?.visitor_count ?? 0;
  const todayQuizzes = daily[0]?.quiz_solved_count ?? 0;

  return (
    <StatsClient
      daily={daily}
      pages={pages}
      langs={langs}
      totalVisitors={totalVisitors}
      totalQuizzes={totalQuizzes}
      todayVisitors={todayVisitors}
      todayQuizzes={todayQuizzes}
    />
  );
}

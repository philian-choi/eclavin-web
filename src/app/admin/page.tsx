import { isAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getAllEpisodes } from '@/lib/episodes';
import DashboardClient from './DashboardClient';

export default async function AdminDashboard() {
  if (!(await isAdmin())) {
    redirect('/admin/login');
  }

  const l1_ko = getAllEpisodes(1, 'ko');
  const l1_en = getAllEpisodes(1, 'en');
  const l2_ko = getAllEpisodes(2, 'ko');
  const l2_en = getAllEpisodes(2, 'en');

  return (
    <DashboardClient 
      l1_ko={l1_ko} 
      l1_en={l1_en} 
      l2_ko={l2_ko} 
      l2_en={l2_en} 
    />
  );
}

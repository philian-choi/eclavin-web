'use server';

import { setAdminSession, isAdmin, clearAdminSession } from '@/lib/auth';
import { saveEpisode, Episode } from '@/lib/episodes';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function loginAction(password: string) {
  const success = await setAdminSession(password);
  return success;
}

export async function logoutAction() {
  await clearAdminSession();
  redirect('/admin/login');
}

export async function saveEpisodeAction(episode: Episode) {
  if (!(await isAdmin())) {
    throw new Error('Unauthorized');
  }

  try {
    saveEpisode(episode);
    revalidatePath('/admin');
    revalidatePath(`/level/${episode.level}/episode/${episode.number}`);
    return { success: true };
  } catch (error: any) {
    console.error('Failed to save episode:', error);
    return { success: false, error: error.message };
  }
}

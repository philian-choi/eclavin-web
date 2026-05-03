import { getEpisode, Episode } from '@/lib/episodes';
import { isAdmin } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import EditForm from './EditForm';

interface Props {
  params: Promise<{
    level: string;
    lang: string;
    id: string;
  }>;
}

export default async function EditEpisodePage({ params }: Props) {
  if (!(await isAdmin())) {
    redirect('/admin/login');
  }

  const { level, lang, id } = await params;
  const episode = getEpisode(parseInt(level), id, lang as any);

  if (!episode) {
    notFound();
  }

  return (
    <EditForm initialEpisode={episode} />
  );
}

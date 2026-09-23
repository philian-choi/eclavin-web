import { formatDateEn, formatDateKo, type Lang } from '@/lib/site';
import styles from '@/app/practice/practice.module.css';

/**
 * "What changed and when" at the foot of a page. The checklist asks for a
 * one-line change note whenever a page's content is revised, so the updated
 * date is explained rather than just bumped.
 */
export default function ChangeLog({
  changes,
  lang = 'en',
}: {
  changes?: { date: string; note: string }[];
  lang?: Lang;
}) {
  if (!changes?.length) return null;
  const ko = lang === 'ko';
  return (
    <section className={styles.related} aria-label={ko ? '고친 이력' : 'Change log'}>
      <h2>{ko ? '고친 이력' : 'Change log'}</h2>
      <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem' }}>
        {changes.map((c) => (
          <li key={`${c.date}-${c.note}`}>
            {ko ? formatDateKo(c.date) : formatDateEn(c.date)}: {c.note}
          </li>
        ))}
      </ul>
    </section>
  );
}

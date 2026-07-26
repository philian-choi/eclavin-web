import { Metadata } from 'next';
import Link from 'next/link';
import { REGIONS } from '@/lib/regionConfig';
import styles from '../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/region`;

export const metadata: Metadata = {
  title: 'Wine Regions Explained: Style, Grapes & Facts (2026)',
  description:
    'A plain-language guide to the principal wine regions for WSET students: Bordeaux, Burgundy, Champagne, Rioja, Napa Valley, and more, with their style, grapes, and exam-relevant facts.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Wine Regions Explained: Style, Grapes & Facts',
    description:
      'The principal wine regions for WSET students: style, grapes, and exam-relevant facts.',
    type: 'website',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

export default function RegionHub() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Wine Regions',
    itemListElement: REGIONS.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: r.name,
      url: `${BASE_URL}/region/${r.slug}`,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Regions', item: PAGE_URL },
    ],
  };

  const ld = JSON.stringify([itemListJsonLd, breadcrumbJsonLd])
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/?lang=en">Home</Link> / Regions
        </nav>

        <h1 className={styles.h1}>Wine Regions Explained</h1>
        <p className={styles.subtitle}>
          The style, grapes, and exam-relevant facts behind the world’s key wine regions. Written for
          WSET students. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.levelCards}>
          {REGIONS.map((r) => (
            <Link key={r.slug} href={`/region/${r.slug}`} className={styles.levelCard}>
              <span className={styles.levelCardTag}>{r.country}</span>
              <h2 className={styles.levelCardTitle}>{r.name}</h2>
              <p className={styles.levelCardMeta}>{r.short}</p>
              <span className={styles.levelCardCta}>Read profile →</span>
            </Link>
          ))}
        </div>

        <section className={styles.related}>
          <h2>Keep studying</h2>
          <div className={styles.relatedLinks}>
            <Link href="/grape">Grape varieties</Link>
            <Link href="/practice">Free WSET practice exams</Link>
            <Link href="/guide">Study guides</Link>
          </div>
        </section>
      </article>
    </main>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { REGIONS } from '@/lib/regionConfig';
import { ORG_REF, jsonLd, ogImage } from '@/lib/site';
import styles from '../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';

// English-only and identical for every visitor: prerender it (and keep <html lang="en">).
export const dynamic = 'force-static';
const PAGE_URL = `${BASE_URL}/region`;

export const metadata: Metadata = {
  title: 'Wine Regions Explained: Style, Grapes & Facts (2026)',
  description:
    'The principal wine regions for WSET students in plain language: Bordeaux, Burgundy, Champagne, Rioja, Napa Valley and more, with style, grapes and exam facts.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Wine Regions Explained: Style, Grapes & Facts',
    description:
      'The principal wine regions for WSET students: style, grapes, and exam-relevant facts.',
    type: 'website',
    url: PAGE_URL,
    images: [ogImage('Wine Regions Explained', 'WSET region guide')],
  },
  twitter: { card: 'summary_large_image', images: [ogImage('Wine Regions Explained', 'WSET region guide')] },
};

export default function RegionHub() {
  // A CollectionPage (a CreativeWork) can name its publisher; a bare ItemList cannot.
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': PAGE_URL,
    url: PAGE_URL,
    name: 'Wine Regions',
    inLanguage: 'en',
    publisher: ORG_REF,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: REGIONS.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: r.name,
        url: `${BASE_URL}/region/${r.slug}`,
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Regions', item: PAGE_URL },
    ],
  };

  const ld = jsonLd([itemListJsonLd, breadcrumbJsonLd]);

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
          WSET students. Updated 26 July 2026.
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

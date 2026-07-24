import { Metadata } from 'next';
import Link from 'next/link';
import { GRAPES } from '@/lib/grapeConfig';
import styles from '../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/grape`;

export const metadata: Metadata = {
  title: 'Grape Varieties Explained: Taste, Style & Regions (2026)',
  description:
    'A plain-language guide to the principal wine grape varieties for WSET students: how Cabernet Sauvignon, Pinot Noir, Chardonnay, Riesling, and more taste, where they grow, and what to pair.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Grape Varieties Explained: Taste, Style & Regions',
    description:
      'How the principal wine grapes taste, where they grow, and what to pair, written for WSET students.',
    type: 'website',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

export default function GrapeHub() {
  const reds = GRAPES.filter((g) => g.color === 'Red');
  const whites = GRAPES.filter((g) => g.color === 'White');

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Wine Grape Varieties',
    itemListElement: GRAPES.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.name,
      url: `${BASE_URL}/grape/${g.slug}`,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Grapes', item: PAGE_URL },
    ],
  };

  const ld = JSON.stringify([itemListJsonLd, breadcrumbJsonLd])
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');

  const renderCards = (list: typeof GRAPES) => (
    <div className={styles.levelCards}>
      {list.map((g) => (
        <Link key={g.slug} href={`/grape/${g.slug}`} className={styles.levelCard}>
          <span className={styles.levelCardTag}>{g.color}</span>
          <h3 className={styles.levelCardTitle}>{g.name}</h3>
          <p className={styles.levelCardMeta}>{g.short}</p>
          <span className={styles.levelCardCta}>Read profile →</span>
        </Link>
      ))}
    </div>
  );

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/?lang=en">Home</Link> / Grapes
        </nav>

        <h1 className={styles.h1}>Grape Varieties Explained</h1>
        <p className={styles.subtitle}>
          How the principal wine grapes taste, where they grow, and what to pair. Written for WSET
          students. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <h2 className={styles.sectionTitle}>Red grapes</h2>
        {renderCards(reds)}

        <h2 className={styles.sectionTitle}>White grapes</h2>
        {renderCards(whites)}

        <section className={styles.related}>
          <h2>Keep studying</h2>
          <div className={styles.relatedLinks}>
            <Link href="/practice">Free WSET practice exams</Link>
            <Link href="/glossary">Wine &amp; WSET glossary</Link>
            <Link href="/guide">Study guides</Link>
          </div>
        </section>
      </article>
    </main>
  );
}

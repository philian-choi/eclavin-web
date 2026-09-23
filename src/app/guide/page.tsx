import { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES } from '@/lib/guidesConfig';
import { ORG_REF, jsonLd, formatDateEn, ogImage } from '@/lib/site';
import styles from '../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/guide`;
const LATEST = GUIDES.map((g) => g.dateModified).sort().at(-1)!;

// English-only and identical for every visitor: prerender it (and keep <html lang="en">).
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'WSET Study Guides: Wine Exam Tips, Study Plans & Comparisons',
  description:
    'Plain-language WSET study guides: how to pass each level, how the exams differ, and how to prepare efficiently, written by the team behind the Eclavin app.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'WSET Study Guides — Wine Exam Tips & Comparisons',
    description: 'How to pass each WSET level, how the exams differ, and how to prepare efficiently.',
    type: 'website',
    url: PAGE_URL,
    images: [ogImage('WSET Study Guides', 'Eclavin study guides')],
  },
  twitter: { card: 'summary_large_image', images: [ogImage('WSET Study Guides', 'Eclavin study guides')] },
};

const guides = GUIDES;

export default function GuidesIndex() {
  // A CollectionPage (a CreativeWork) can name its publisher; a bare ItemList cannot.
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': PAGE_URL,
    url: PAGE_URL,
    name: 'WSET Study Guides',
    inLanguage: 'en',
    dateModified: LATEST,
    publisher: ORG_REF,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: guides.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: g.title,
        url: `${BASE_URL}/guide/${g.slug}`,
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: PAGE_URL },
    ],
  };

  const ld = jsonLd([itemListJsonLd, breadcrumbJsonLd]);

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/?lang=en">Home</Link> / Guides
        </nav>

        <h1 className={styles.h1}>WSET Study Guides</h1>
        <p className={styles.subtitle}>
          Plain-language help for wine exam candidates: how to pass, how the levels differ, and how to
          prepare efficiently. Updated {formatDateEn(LATEST)}.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.levelCards}>
          {guides.map((g) => (
            <Link key={g.slug} href={`/guide/${g.slug}`} className={styles.levelCard}>
              <span className={styles.levelCardTag}>{g.tag}</span>
              <h2 className={styles.levelCardTitle}>{g.title}</h2>
              <p className={styles.levelCardMeta}>{g.blurb}</p>
              <span className={styles.levelCardCta}>Read guide →</span>
            </Link>
          ))}
        </div>

        <section className={styles.related}>
          <h2>Practise what you learn</h2>
          <div className={styles.relatedLinks}>
            <Link href="/practice">All WSET practice exams</Link>
            <Link href="/practice/wset-level-1">Level 1 practice</Link>
            <Link href="/practice/wset-level-2">Level 2 practice</Link>
            <Link href="/glossary">Wine &amp; WSET glossary</Link>
            <Link href="/grape">Grape varieties</Link>
            <Link href="/region">Wine regions</Link>
          </div>
        </section>
      </article>
    </main>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import { GLOSSARY } from '@/lib/glossaryConfig';
import styles from '../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/glossary`;

export const metadata: Metadata = {
  title: 'Wine & WSET Glossary — Key Terms Explained (2026)',
  description:
    'A plain-language glossary of the wine terms WSET students look up most: tannin, acidity, body, terroir, malolactic fermentation, and more, each with an exam-focused explanation.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Wine & WSET Glossary — Key Terms Explained',
    description:
      'Plain-language definitions of the wine terms WSET students look up most, each with an exam-focused angle.',
    type: 'website',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

export default function GlossaryHub() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Eclavin Wine & WSET Glossary',
    url: PAGE_URL,
    hasDefinedTerm: GLOSSARY.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.short,
      url: `${BASE_URL}/glossary/${t.slug}`,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: PAGE_URL },
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
          <Link href="/?lang=en">Home</Link> / Glossary
        </nav>

        <h1 className={styles.h1}>Wine &amp; WSET Glossary</h1>
        <p className={styles.subtitle}>
          The terms WSET students look up most, in plain language, each with why it matters for the
          exam. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.levelCards}>
          {GLOSSARY.map((t) => (
            <Link key={t.slug} href={`/glossary/${t.slug}`} className={styles.levelCard}>
              <span className={styles.levelCardTag}>Term</span>
              <h2 className={styles.levelCardTitle}>{t.term}</h2>
              <p className={styles.levelCardMeta}>{t.short}</p>
              <span className={styles.levelCardCta}>Read definition →</span>
            </Link>
          ))}
        </div>

        <section className={styles.related}>
          <h2>Put the terms to work</h2>
          <div className={styles.relatedLinks}>
            <Link href="/practice">All WSET practice exams</Link>
            <Link href="/guide/wset-systematic-approach-to-tasting">Tasting method (SAT)</Link>
            <Link href="/guide">All study guides</Link>
          </div>
        </section>
      </article>
    </main>
  );
}

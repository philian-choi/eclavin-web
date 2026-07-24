import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGlossaryTerm, GLOSSARY, GLOSSARY_SLUGS } from '@/lib/glossaryConfig';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

export function generateStaticParams() {
  return GLOSSARY_SLUGS.map((term) => ({ term }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ term: string }>;
}): Promise<Metadata> {
  const { term } = await params;
  const t = getGlossaryTerm(term);
  if (!t) return {};
  const url = `${BASE_URL}/glossary/${t.slug}`;
  const title = `${t.term} — Wine & WSET Glossary`;
  return {
    title: `${title} | Eclavin`,
    description: `${t.term} in wine, explained for WSET students: ${t.short}`,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: t.short,
      type: 'article',
      url,
      images: [`${BASE_URL}/og-image.png`],
    },
    twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { term } = await params;
  const t = getGlossaryTerm(term);
  if (!t) notFound();

  const pageUrl = `${BASE_URL}/glossary/${t.slug}`;
  const others = GLOSSARY.filter((g) => g.slug !== t.slug).slice(0, 6);

  const definedTermJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: t.term,
    description: t.definition,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'Eclavin Wine & WSET Glossary',
      url: `${BASE_URL}/glossary`,
    },
    url: pageUrl,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${BASE_URL}/glossary` },
      { '@type': 'ListItem', position: 3, name: t.term, item: pageUrl },
    ],
  };

  const ld = JSON.stringify([definedTermJsonLd, breadcrumbJsonLd])
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/?lang=en">Home</Link> / <Link href="/glossary">Glossary</Link> / {t.term}
        </nav>

        <h1 className={styles.h1}>{t.term}</h1>
        <p className={styles.subtitle}>{t.short}</p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>Definition</h2>
          <p>{t.definition}</p>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>Why it matters for WSET</h2>
          <p>{t.whyItMatters}</p>
          <h2 className={styles.sectionTitle}>Example</h2>
          <p>{t.example}</p>
        </div>

        <section className={styles.cta}>
          <h2>Test yourself on this</h2>
          <p>
            Reading a definition is one thing; recalling it in the exam is another. Practise free WSET
            questions, then get the full bank and a wrong-answer notebook in the Eclavin app.
          </p>
          <TrackedAppStoreLink href={APP_STORE_URL} className={styles.ctaButton}>
            <svg viewBox="0 0 384 512" width={16} height={16} fill="currentColor" aria-hidden="true">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <span>Download Eclavin on the App Store</span>
          </TrackedAppStoreLink>
        </section>

        <section className={styles.related}>
          <h2>More wine terms</h2>
          <div className={styles.relatedLinks}>
            <Link href="/glossary">Full glossary</Link>
            {others.map((g) => (
              <Link key={g.slug} href={`/glossary/${g.slug}`}>
                {g.term}
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.related}>
          <h2>Practise</h2>
          <div className={styles.relatedLinks}>
            <Link href="/practice/wset-level-2">Level 2 practice questions</Link>
            <Link href="/practice/wset-level-1">Level 1 practice questions</Link>
            <Link href="/guide/wset-systematic-approach-to-tasting">Tasting method (SAT)</Link>
          </div>
        </section>
      </article>
    </main>
  );
}

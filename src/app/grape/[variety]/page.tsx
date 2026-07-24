import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGrape, GRAPES, GRAPE_SLUGS } from '@/lib/grapeConfig';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';
const UPDATED = '2026-07-24';

export function generateStaticParams() {
  return GRAPE_SLUGS.map((variety) => ({ variety }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variety: string }>;
}): Promise<Metadata> {
  const { variety } = await params;
  const g = getGrape(variety);
  if (!g) return {};
  const url = `${BASE_URL}/grape/${g.slug}`;
  const title = `${g.name}: Taste, Style & Regions (2026)`;
  return {
    title: `${title} | Eclavin`,
    description: `${g.name} explained for WSET students: ${g.short} ${g.character}`.slice(0, 300),
    alternates: { canonical: url },
    openGraph: {
      title,
      description: g.short,
      type: 'article',
      url,
      images: [`${BASE_URL}/og-image.png`],
    },
    twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
  };
}

export default async function GrapePage({
  params,
}: {
  params: Promise<{ variety: string }>;
}) {
  const { variety } = await params;
  const g = getGrape(variety);
  if (!g) notFound();

  const pageUrl = `${BASE_URL}/grape/${g.slug}`;
  const others = GRAPES.filter((x) => x.slug !== g.slug).slice(0, 6);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${g.name}: Taste, Style & Regions`,
    description: g.short,
    about: { '@type': 'Thing', name: `${g.name} (grape variety)` },
    author: { '@type': 'Organization', name: 'Eclavin', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'Eclavin', url: BASE_URL },
    mainEntityOfPage: pageUrl,
    datePublished: UPDATED,
    dateModified: UPDATED,
    inLanguage: 'en',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: g.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Grapes', item: `${BASE_URL}/grape` },
      { '@type': 'ListItem', position: 3, name: g.name, item: pageUrl },
    ],
  };

  const ld = JSON.stringify([articleJsonLd, faqJsonLd, breadcrumbJsonLd])
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/?lang=en">Home</Link> / <Link href="/grape">Grapes</Link> / {g.name}
        </nav>

        <h1 className={styles.h1}>{g.name}</h1>
        <p className={styles.subtitle}>
          {g.color} grape · {g.short}
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>In short</h2>
          <p>{g.character}</p>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>Where it grows</h2>
          <p>{g.regions}</p>
          <h2 className={styles.sectionTitle}>Food pairing</h2>
          <p>{g.pairing}</p>
          <h2 className={styles.sectionTitle}>Why it matters for WSET</h2>
          <p>{g.examNote}</p>
        </div>

        <section className={styles.cta}>
          <h2>Practise your grape knowledge</h2>
          <p>
            Grape varieties are core WSET material. Try free practice questions with explanations,
            then get the full bank and a wrong-answer notebook in the Eclavin app.
          </p>
          <TrackedAppStoreLink href={APP_STORE_URL} className={styles.ctaButton}>
            <svg viewBox="0 0 384 512" width={16} height={16} fill="currentColor" aria-hidden="true">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <span>Download Eclavin on the App Store</span>
          </TrackedAppStoreLink>
        </section>

        <section className={styles.faq}>
          <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>
            Frequently asked questions
          </h2>
          {g.faq.map((item, i) => (
            <details key={i} className={styles.faqItem}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>

        <section className={styles.related}>
          <h2>Other grapes</h2>
          <div className={styles.relatedLinks}>
            <Link href="/grape">All grape varieties</Link>
            {others.map((x) => (
              <Link key={x.slug} href={`/grape/${x.slug}`}>
                {x.name}
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.related}>
          <h2>Practise</h2>
          <div className={styles.relatedLinks}>
            <Link href="/practice/wset-level-2">Level 2 practice questions</Link>
            <Link href="/glossary">Wine &amp; WSET glossary</Link>
            <Link href="/guide/old-world-vs-new-world-wine">Old World vs New World</Link>
          </div>
        </section>
      </article>
    </main>
  );
}

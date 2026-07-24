import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/guide/wset-systematic-approach-to-tasting`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

export const metadata: Metadata = {
  title: 'The WSET Systematic Approach to Tasting (SAT), Explained (2026)',
  description:
    'A plain-language guide to the WSET Systematic Approach to Tasting (SAT): the appearance, nose, palate, and conclusion steps, and how to use it to pass the tasting exam.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'The WSET Systematic Approach to Tasting (SAT), Explained (2026)',
    description:
      'A plain-language guide to the WSET Systematic Approach to Tasting (SAT): the appearance, nose, palate, and conclusion steps, and how to use it to pass the tasting exam.',
    type: 'article',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'What does SAT stand for in WSET?',
    a: "Systematic Approach to Tasting. It is WSET's structured method for assessing and describing a wine consistently.",
  },
  {
    q: 'What are the four steps of the SAT?',
    a: 'Appearance, Nose, Palate, and Conclusions. You work through them in that order every time.',
  },
  {
    q: 'Is the SAT tested at Level 2?',
    a: 'Yes, in a simpler form. Level 3 uses a more detailed version with written conclusions and a blind tasting exam of two wines.',
  },
  {
    q: 'What are primary, secondary, and tertiary aromas?',
    a: 'Primary aromas come from the grape and fermentation, secondary from winemaking such as oak or malolactic fermentation, and tertiary from ageing such as dried fruit or leather.',
  },
  {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET.',
  },
];

export default function WsetSatGuide() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The WSET Systematic Approach to Tasting (SAT), Explained',
    description:
      'A plain-language guide to the WSET Systematic Approach to Tasting (SAT): the appearance, nose, palate, and conclusion steps, and how to use it to pass the tasting exam.',
    author: { '@type': 'Organization', name: 'Eclavin', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'Eclavin', url: BASE_URL },
    mainEntityOfPage: PAGE_URL,
    datePublished: '2026-07-24',
    dateModified: '2026-07-24',
    inLanguage: 'en',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
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
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guide` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'WSET Systematic Approach to Tasting',
        item: PAGE_URL,
      },
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
          <Link href="/?lang=en">Home</Link> / <Link href="/guide">Guides</Link> / WSET Systematic
          Approach to Tasting
        </nav>

        <h1 className={styles.h1}>The WSET Systematic Approach to Tasting (SAT)</h1>
        <p className={styles.subtitle}>
          The step-by-step method for describing any wine. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            The <strong>SAT</strong> is WSET's structured checklist for describing a wine the same
            way every time. You work through four stages: <strong>Appearance</strong>,{' '}
            <strong>Nose</strong>, <strong>Palate</strong>, and <strong>Conclusions</strong>. Using
            the same words in the same order removes guesswork and is exactly what the tasting exam
            rewards.
          </p>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>Stage 1: Appearance</h2>
          <p>
            Assess clarity (clear or hazy), intensity (pale, medium, or deep), and colour. For white
            wines the colour runs lemon, gold, then amber; for reds ruby, garnet, then tawny; rosé
            shows shades of pink. Appearance gives early clues to age and grape.
          </p>

          <h2 className={styles.sectionTitle}>Stage 2: Nose</h2>
          <p>
            Judge condition (clean, or faulty such as cork taint), intensity (light, medium,
            pronounced), and the aroma characteristics. Aromas are grouped as primary (from the
            grape and fermentation, such as fruit, floral, herbal), secondary (from winemaking, such
            as vanilla and toast from oak, or butter from malolactic fermentation), and tertiary
            (from ageing, such as dried fruit, leather, or mushroom).
          </p>

          <h2 className={styles.sectionTitle}>Stage 3: Palate</h2>
          <p>
            Assess sweetness (dry to sweet), acidity (low to high), tannin for reds (low to high),
            alcohol (low to high), body (light to full), flavour intensity and characteristics (the
            same primary, secondary, and tertiary families), and the finish (short to long).
          </p>

          <h2 className={styles.sectionTitle}>Stage 4: Conclusions</h2>
          <p>
            State a judgement backed by what you observed. At Level 2 you assess quality; at Level 3
            you also give the quality level with reasons and say whether the wine is ready to drink.
            The conclusion must follow from your notes, not a guess.
          </p>

          <h2 className={styles.sectionTitle}>How the SAT differs by level</h2>
          <p>
            Level 2 uses a simpler version of the grid. Level 3 adds more detail and requires
            written conclusions with reasoning, and it is examined through a blind tasting of two
            wines.
          </p>

          <h2 className={styles.sectionTitle}>How to practise the SAT</h2>
          <p>
            Taste with the grid in front of you, use only the allowed words, and compare your notes
            with a model answer. Repetition is what makes the structure automatic under exam
            pressure.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Lock in the theory behind the tasting</h2>
          <p>
            Great tasting rests on knowing grapes, regions, and winemaking. Practise free questions
            here, then get the full bank and mock exams in the Eclavin app.
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
          {faqItems.map((item, i) => (
            <details key={i} className={styles.faqItem}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </section>

        <section className={styles.related}>
          <h2>Keep going</h2>
          <div className={styles.relatedLinks}>
            <Link href="/practice">All WSET practice exams</Link>
            <Link href="/guide/wset-level-2-vs-level-3">Level 2 vs Level 3</Link>
            <Link href="/guide/wset-levels-explained">WSET levels explained</Link>
          </div>
        </section>
      </article>
    </main>
  );
}

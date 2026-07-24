import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/guide/old-world-vs-new-world-wine`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

export const metadata: Metadata = {
  title: 'Old World vs New World Wine: What’s the Difference? (2026)',
  description:
    'Old World vs New World wine explained: how the labels, styles, climates, and regions differ, and why it is a general guide rather than a strict rule.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Old World vs New World Wine: What’s the Difference?',
    description:
      'Old World vs New World wine explained: how the labels, styles, climates, and regions differ, and why it is a general guide.',
    type: 'article',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'Is Old World or New World wine better?',
    a: 'Neither is better; they are different styles. Old World wines tend to be more restrained and higher in acidity, New World wines riper and fruitier. The best choice depends on your taste and the food.',
  },
  {
    q: 'Is the USA Old World or New World?',
    a: 'New World. So are Australia, New Zealand, Chile, Argentina, and South Africa. Old World refers to Europe.',
  },
  {
    q: 'Why do European wine labels not show the grape?',
    a: 'Old World labels lead with the place, and the rules of each appellation set which grapes are allowed. The grape is implied by the region rather than printed.',
  },
  {
    q: 'Is Old World vs New World a strict rule?',
    a: 'No. It is a general guide. Climate and winemaking now blur the line, with restrained New World wines and ripe Old World wines both common.',
  },
  {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET.',
  },
];

const rows: { label: string; old: string; new: string }[] = [
  {
    label: 'Label leads with',
    old: 'The place (appellation)',
    new: 'The grape variety',
  },
  { label: 'Climate (broadly)', old: 'Often cooler', new: 'Often warmer' },
  {
    label: 'Typical style',
    old: 'More restrained, earthy, higher acidity',
    new: 'Riper, fruitier, fuller-bodied',
  },
  {
    label: 'Examples',
    old: 'Burgundy, Chianti, Rioja',
    new: 'California, Barossa, Marlborough',
  },
];

export default function OldWorldVsNewWorldGuide() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Old World vs New World Wine: What’s the Difference?',
    description:
      'Old World vs New World wine explained: how the labels, styles, climates, and regions differ, and why it is a general guide rather than a strict rule.',
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
      { '@type': 'ListItem', position: 3, name: 'Old World vs New World Wine', item: PAGE_URL },
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
          <Link href="/?lang=en">Home</Link> / <Link href="/guide">Guides</Link> / Old World vs New
          World Wine
        </nav>

        <h1 className={styles.h1}>Old World vs New World Wine</h1>
        <p className={styles.subtitle}>
          The labels, styles, and regions behind wine’s biggest divide. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            <strong>Old World</strong> means Europe (France, Italy, Spain and more), where labels
            lead with the <strong>place</strong> and styles lean more restrained, earthy, and higher
            in acidity. <strong>New World</strong> means everywhere else (the USA, Australia, Chile
            and more), where labels lead with the <strong>grape</strong> and styles lean riper,
            fruitier, and fuller. It is a useful <strong>general guide</strong>, not a strict rule.
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">&nbsp;</th>
                <th scope="col">Old World</th>
                <th scope="col">New World</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>{r.old}</td>
                  <td>{r.new}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>Why the split exists</h2>
          <p>
            Old World regions have made wine for centuries and built rules around place, so the label
            names where the wine is from. New World regions are newer to wine and market by grape, so
            the label names the variety. That single difference drives most of what follows.
          </p>

          <h2 className={styles.sectionTitle}>How to read the label</h2>
          <p>
            If a bottle says Chablis or Barolo, that is a place, and you are expected to know the
            grape behind it. If it says Chardonnay or Shiraz, that is the grape, common in the New
            World. Learning a few classic place-to-grape links unlocks Old World labels.
          </p>

          <h2 className={styles.sectionTitle}>Why the styles differ</h2>
          <p>
            Cooler Old World climates tend to give fresher, higher-acid, more savoury wines. Warmer
            New World climates ripen grapes more fully, giving bolder fruit and higher alcohol.
            Winemaking choices push each further.
          </p>

          <h2 className={styles.sectionTitle}>The caveats</h2>
          <p>
            The divide is blurring. Cool New World spots make restrained wines, warm Old World areas
            make ripe ones, and winemakers borrow ideas across both. Treat Old World versus New World
            as a starting frame, then taste for yourself.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Test what you know</h2>
          <p>
            Old World and New World styles are core WSET material. Practise free questions here, then
            get the full bank and explanations in the Eclavin app.
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
            <Link href="/glossary/old-world-new-world">Old World vs New World term</Link>
            <Link href="/practice/wset-level-2">Level 2 practice questions</Link>
            <Link href="/practice">Free practice exams</Link>
          </div>
        </section>
      </article>
    </main>
  );
}

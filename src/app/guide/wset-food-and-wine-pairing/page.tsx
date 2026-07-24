import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/guide/wset-food-and-wine-pairing`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';

export const metadata: Metadata = {
  title: 'WSET Food & Wine Pairing Rules Explained (2026)',
  description:
    'How the WSET method explains food and wine pairing: how sweetness, umami, salt, acid, and chilli in food change the taste of wine, with the golden rule.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'WSET Food & Wine Pairing Rules Explained (2026)',
    description:
      'How sweetness, umami, salt, acid, and chilli in food change the taste of wine, with the WSET golden rule.',
    type: 'article',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'What food makes wine taste bad?',
    a: 'Unmatched sweetness and umami are the main culprits. A dry wine with a sweet dessert tastes sour and thin, and savoury, umami-rich foods make tannic reds taste more bitter.',
  },
  {
    q: 'What wine goes with spicy food?',
    a: 'Choose a lower-alcohol, off-dry (slightly sweet) wine. Chilli heat makes alcohol feel hotter, and a touch of sweetness cools the burn.',
  },
  {
    q: 'What is the golden rule of wine pairing?',
    a: 'The wine should be as sweet as, or sweeter than, the food. This prevents the most common pairing failures and is a key WSET principle.',
  },
  {
    q: 'Does salty food ruin wine?',
    a: 'No, the opposite. Salt softens wine and makes it taste fruitier, which is why salty snacks pair well with crisp, high-acid whites.',
  },
  {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin is an independent study app and is not affiliated with, endorsed by, or connected to WSET.',
  },
];

const rows: { component: string; effect: string }[] = [
  {
    component: 'Sweetness',
    effect:
      'Makes wine seem less sweet, and more acidic and bitter; match it with an equally sweet or sweeter wine',
  },
  {
    component: 'Umami (savoury)',
    effect: 'Makes wine seem harder: more bitter and drying, less fruity',
  },
  {
    component: 'Salt',
    effect: 'Softens the wine and makes it seem fruitier (a helpful, food-friendly effect)',
  },
  {
    component: 'Acid',
    effect: 'Softens the wine’s own acidity and makes it seem richer and fruitier (helpful)',
  },
  {
    component: 'Chilli heat',
    effect: 'Increases the burn of alcohol and bitterness; choose lower-alcohol, off-dry wines',
  },
];

export default function FoodAndWinePairingGuide() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'WSET Food & Wine Pairing Rules',
    description:
      'How the WSET method explains food and wine pairing: how sweetness, umami, salt, acid, and chilli in food change the taste of wine, with the golden rule.',
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
      { '@type': 'ListItem', position: 3, name: 'WSET Food & Wine Pairing', item: PAGE_URL },
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
          <Link href="/?lang=en">Home</Link> / <Link href="/guide">Guides</Link> / WSET Food &amp;
          Wine Pairing
        </nav>

        <h1 className={styles.h1}>WSET Food &amp; Wine Pairing Rules</h1>
        <p className={styles.subtitle}>
          How components in food change the taste of wine. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            WSET teaches pairing through how parts of the food change the wine. Two food components
            make wine taste harder: <strong>sweetness</strong> and <strong>umami</strong> make it
            seem more bitter and acidic. Two make it softer: <strong>salt</strong> and{' '}
            <strong>acid</strong> make wine taste smoother and fruitier. The golden rule: the wine
            should be <strong>as sweet as, or sweeter than</strong>, the food.
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">Component in food</th>
                <th scope="col">Effect on the wine</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.component}>
                  <th scope="row">{r.component}</th>
                  <td>{r.effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>The two that make wine harder</h2>
          <p>
            Sweetness and umami in food are the risky ones. A dry wine next to a sweet dessert tastes
            thin and sour, and umami-rich foods (like mushrooms or aged cheese) make tannic reds
            taste more bitter. Plan around these.
          </p>

          <h2 className={styles.sectionTitle}>The two that make wine friendlier</h2>
          <p>
            Salt and acid in food are your allies. Salt softens a wine and lifts its fruit, which is
            why salty snacks love crisp whites. Acid in food (a squeeze of lemon) makes a high-acid
            wine taste rounder.
          </p>

          <h2 className={styles.sectionTitle}>Spicy food</h2>
          <p>
            Chilli heat makes alcohol feel hotter and bitterness sharper. Reach for a lower-alcohol,
            slightly sweet (off-dry) wine to cool the burn.
          </p>

          <h2 className={styles.sectionTitle}>The golden rule</h2>
          <p>
            When in doubt, make sure the wine is at least as sweet as the food. This one rule prevents
            the most common pairing failures, and it is a favourite WSET exam point.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Test your pairing knowledge</h2>
          <p>
            Pairing rules are exam favourites. Practise free WSET questions, then get the full bank
            and explanations in the Eclavin app.
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
            <Link href="/practice/wset-level-2">Level 2 practice questions</Link>
            <Link href="/glossary/sweetness">What is sweetness in wine</Link>
            <Link href="/practice">Free practice exams</Link>
          </div>
        </section>
      </article>
    </main>
  );
}

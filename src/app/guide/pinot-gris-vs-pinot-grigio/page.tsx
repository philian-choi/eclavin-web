import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import { getGuide } from '@/lib/guidesConfig';
import ChangeLog from '@/components/ChangeLog';
import { APP_QUESTIONS, APP_STORE_URL, BASE_URL, ORG_REF, formatDateEn, jsonLd, ogImage } from '@/lib/site';
import styles from '../../practice/practice.module.css';

/**
 * Built from Search Console demand (2026-09): about 15 phrasings of "pinot gris vs
 * pinot grigio" (difference, same grape?) had impressions. The /grape page covers
 * the variety; this page answers the comparison. Facts match that page.
 */
const PAGE_URL = `${BASE_URL}/guide/pinot-gris-vs-pinot-grigio`;
const GUIDE = getGuide('pinot-gris-vs-pinot-grigio')!;

// English-only and identical for every visitor: prerender it (and keep <html lang="en">).
export const dynamic = 'force-static';

const TITLE = 'Pinot Gris vs Pinot Grigio: What’s the Difference? | Eclavin';
const DESCRIPTION =
  'Pinot Gris and Pinot Grigio are the same grape. The name signals the style: light, crisp Italian Pinot Grigio or riper, fuller Alsace Pinot Gris. Side by side.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: GUIDE.title,
    description: 'Same grape, two styles: light Italian Pinot Grigio versus fuller Alsace Pinot Gris.',
    type: 'article',
    url: PAGE_URL,
    images: [ogImage(GUIDE.title, 'Wine comparison')],
  },
  twitter: { card: 'summary_large_image', images: [ogImage(GUIDE.title, 'Wine comparison')] },
};

const ROWS: { label: string; grigio: string; gris: string }[] = [
  { label: 'Grape', grigio: 'Pinot Gris, under its Italian name', gris: 'Pinot Gris, under its French name' },
  { label: 'Classic home', grigio: 'Northern Italy: Veneto, Friuli, Alto Adige', gris: 'Alsace, France' },
  { label: 'Sweetness', grigio: 'Dry', gris: 'Dry to off-dry; late-harvest versions are sweet' },
  { label: 'Body', grigio: 'Light', gris: 'Medium to full' },
  { label: 'Acidity', grigio: 'Medium to high, crisp', gris: 'Medium' },
  { label: 'Flavours', grigio: 'Lemon, green apple, pear; fairly neutral', gris: 'Ripe pear, peach, honey, a hint of spice' },
  { label: 'Oak', grigio: 'Usually none', gris: 'Usually none or old oak' },
  { label: 'With food', grigio: 'Aperitif, light seafood, salads', gris: 'Pork, chicken in cream sauce, mildly spiced dishes' },
];

const faqItems = [
  {
    q: 'Are Pinot Gris and Pinot Grigio the same grape?',
    a: 'Yes. Pinot Gris is the French name and Pinot Grigio the Italian name for the same grape, a grey-pink skinned relative of Pinot Noir. The difference is the style the name usually signals.',
  },
  {
    q: 'Which is sweeter, Pinot Gris or Pinot Grigio?',
    a: 'Pinot Gris can be. Italian Pinot Grigio is dry. Alsace Pinot Gris is often dry but can be off-dry, and its late-harvest versions are sweet.',
  },
  {
    q: 'Which is lighter?',
    a: 'Pinot Grigio. It is usually picked early to keep it light and crisp. Pinot Gris is picked riper, so it has more body and richer fruit.',
  },
  {
    q: 'What do winemakers outside Europe call it?',
    a: 'Either name. Producers in places such as Oregon, New Zealand and Australia usually pick the name that matches the style they make: Pinot Grigio for light and crisp, Pinot Gris for riper and fuller.',
  },
  {
    q: 'What is Grauburgunder?',
    a: 'The German name for Pinot Gris. It is usually a dry, medium-bodied wine.',
  },
];

export default function PinotGrisVsGrigioPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: GUIDE.title,
    description: DESCRIPTION,
    author: ORG_REF,
    publisher: ORG_REF,
    mainEntityOfPage: PAGE_URL,
    datePublished: GUIDE.datePublished,
    dateModified: GUIDE.dateModified,
    inLanguage: 'en',
    isAccessibleForFree: true,
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/?lang=en` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guide` },
      { '@type': 'ListItem', position: 3, name: 'Pinot Gris vs Pinot Grigio', item: PAGE_URL },
    ],
  };

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([articleJsonLd, faqJsonLd, breadcrumbJsonLd]) }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/?lang=en">Home</Link> / <Link href="/guide">Guides</Link> / Pinot Gris vs Pinot Grigio
        </nav>

        <h1 className={styles.h1}>Pinot Gris vs Pinot Grigio</h1>
        <p className={styles.subtitle}>
          Same grape, two styles. Updated {formatDateEn(GUIDE.dateModified)}.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            They are <strong>the same grape</strong>. The name tells you the style. <strong>Pinot Grigio</strong>{' '}
            is the Italian name and usually means a light, crisp, dry white. <strong>Pinot Gris</strong> is the
            French name and usually means a riper, fuller wine in the Alsace style, sometimes off-dry.
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col"> </th>
                <th scope="col">Pinot Grigio (Italian style)</th>
                <th scope="col">Pinot Gris (Alsace style)</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>{r.grigio}</td>
                  <td>{r.gris}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>Why one grape makes two styles</h2>
          <p>
            The difference is when the grapes are picked and where they grow. In northern Italy most Pinot
            Grigio is picked early, while acidity is high and flavours are still delicate. In Alsace, a dry
            and sunny region, growers leave the grapes to ripen longer. Riper grapes give more sugar, so the
            wine has more alcohol and body, or keeps some sweetness.
          </p>

          <h2 className={styles.sectionTitle}>How to spot it on an exam</h2>
          <p>
            A question describing a light, neutral, crisp white from the Veneto points to Pinot Grigio. A
            richer, spicy, possibly off-dry white from Alsace points to Pinot Gris. At WSET Level 2, knowing
            that the name signals the style is usually what the question tests.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Test yourself on grape styles</h2>
          <p>
            Grape characteristics are among the most-missed WSET Level 2 topics. Try the free practice
            questions, then practise with the Eclavin app’s {APP_QUESTIONS.en} questions.
          </p>
          <TrackedAppStoreLink href={APP_STORE_URL} className={styles.ctaButton}>
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
            <Link href="/grape/pinot-grigio-gris">Pinot Grigio / Pinot Gris grape profile</Link>
            <Link href="/guide/sweet-or-dry-wine-chart">Sweet or dry? Chart of all 12 grapes</Link>
            <Link href="/practice/wset-level-2?lang=en">Level 2 practice questions</Link>
          </div>
        </section>

        <ChangeLog changes={GUIDE.changes} />
      </article>
    </main>
  );
}

import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import { getGuide } from '@/lib/guidesConfig';
import ChangeLog from '@/components/ChangeLog';
import { APP_STORE_URL, BASE_URL, ORG_REF, formatDateEn, jsonLd, ogImage } from '@/lib/site';
import styles from '../../practice/practice.module.css';

/**
 * Data page built from Search Console demand (2026-09): about 35 phrasings of
 * "is <grape> sweet or dry" had impressions but no page that answered them.
 * One chart answers all of them; the grape facts match the /grape pages.
 */
const PAGE_URL = `${BASE_URL}/guide/sweet-or-dry-wine-chart`;
const GUIDE = getGuide('sweet-or-dry-wine-chart')!;

// English-only and identical for every visitor: prerender it (and keep <html lang="en">).
export const dynamic = 'force-static';

const TITLE = 'Sweet or Dry? Wine Sweetness Chart for 12 Grapes | Eclavin';
const DESCRIPTION =
  'Is Merlot sweet? Is Chardonnay dry? One chart shows how sweet, full-bodied, acidic and tannic the 12 principal wine grapes usually are, plus the label words.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Sweet or Dry? Wine Sweetness Chart by Grape',
    description: 'How sweet, full-bodied, acidic and tannic the 12 principal wine grapes usually are.',
    type: 'article',
    url: PAGE_URL,
    images: [ogImage(GUIDE.title, 'Wine reference chart')],
  },
  twitter: { card: 'summary_large_image', images: [ogImage(GUIDE.title, 'Wine reference chart')] },
};

interface Row {
  slug: string;
  grape: string;
  colour: 'Red' | 'White';
  usually: string;
  sweetVersions: string;
  body: string;
  acidity: string;
  tannin: string;
}

// Typical still-wine styles at WSET Level 2 depth. "Sweet versions" lists the
// well-known exceptions only.
const ROWS: Row[] = [
  { slug: 'cabernet-sauvignon', grape: 'Cabernet Sauvignon', colour: 'Red', usually: 'Dry', sweetVersions: 'None common', body: 'Full', acidity: 'High', tannin: 'High' },
  { slug: 'merlot', grape: 'Merlot', colour: 'Red', usually: 'Dry', sweetVersions: 'None common', body: 'Medium to full', acidity: 'Medium', tannin: 'Medium (softer than Cabernet)' },
  { slug: 'pinot-noir', grape: 'Pinot Noir', colour: 'Red', usually: 'Dry', sweetVersions: 'None common', body: 'Light to medium', acidity: 'High', tannin: 'Low to medium' },
  { slug: 'syrah-shiraz', grape: 'Syrah / Shiraz', colour: 'Red', usually: 'Dry', sweetVersions: 'None common', body: 'Full', acidity: 'Medium', tannin: 'Medium to high' },
  { slug: 'grenache', grape: 'Grenache', colour: 'Red', usually: 'Dry', sweetVersions: 'Sweet fortified reds of southern France (Banyuls, Maury)', body: 'Medium to full', acidity: 'Low to medium', tannin: 'Medium' },
  { slug: 'sangiovese', grape: 'Sangiovese', colour: 'Red', usually: 'Dry', sweetVersions: 'None common', body: 'Medium to full', acidity: 'High', tannin: 'High' },
  { slug: 'tempranillo', grape: 'Tempranillo', colour: 'Red', usually: 'Dry', sweetVersions: 'None common', body: 'Medium', acidity: 'Medium', tannin: 'Medium' },
  { slug: 'malbec', grape: 'Malbec', colour: 'Red', usually: 'Dry', sweetVersions: 'None common', body: 'Full', acidity: 'Medium', tannin: 'Medium to high' },
  { slug: 'chardonnay', grape: 'Chardonnay', colour: 'White', usually: 'Dry', sweetVersions: 'None common', body: 'Medium to full', acidity: 'Medium', tannin: 'None (white)' },
  { slug: 'sauvignon-blanc', grape: 'Sauvignon Blanc', colour: 'White', usually: 'Dry', sweetVersions: 'Sauternes, blended with Sémillon and made from grapes with noble rot', body: 'Light to medium', acidity: 'High', tannin: 'None (white)' },
  { slug: 'riesling', grape: 'Riesling', colour: 'White', usually: 'Dry to very sweet', sweetVersions: 'Many German styles; noble rot wines and ice wine are very sweet', body: 'Light', acidity: 'High', tannin: 'None (white)' },
  { slug: 'pinot-grigio-gris', grape: 'Pinot Grigio / Pinot Gris', colour: 'White', usually: 'Dry', sweetVersions: 'Alsace Pinot Gris can be off-dry; late-harvest versions are sweet', body: 'Light to medium', acidity: 'Medium to high', tannin: 'None (white)' },
];

// Sugar per litre for sparkling wine label terms (EU rules).
const SPARKLING = [
  { term: 'Brut Nature', sugar: '0-3 g/L', taste: 'Bone dry' },
  { term: 'Extra Brut', sugar: '0-6 g/L', taste: 'Very dry' },
  { term: 'Brut', sugar: 'Under 12 g/L', taste: 'Dry' },
  { term: 'Extra Dry', sugar: '12-17 g/L', taste: 'Off-dry (sweeter than Brut)' },
  { term: 'Sec', sugar: '17-32 g/L', taste: 'Medium-dry' },
  { term: 'Demi-Sec', sugar: '32-50 g/L', taste: 'Medium-sweet' },
  { term: 'Doux', sugar: 'Over 50 g/L', taste: 'Sweet' },
];

const faqItems = [
  {
    q: 'Is Merlot sweet or dry?',
    a: 'Merlot is almost always dry. Its soft tannin and ripe plum and chocolate flavours can make it seem sweet, but there is very little sugar in the wine.',
  },
  {
    q: 'Is Chardonnay sweet or dry?',
    a: 'Chardonnay is almost always dry. Oak can add vanilla and malolactic fermentation can add a buttery richness, which some people read as sweetness.',
  },
  {
    q: 'Is Pinot Grigio sweet or dry?',
    a: 'Italian Pinot Grigio is usually dry, light and crisp. The same grape as Alsace Pinot Gris is richer and is sometimes off-dry, and late-harvest versions are sweet.',
  },
  {
    q: 'Is Burgundy wine sweet or dry?',
    a: 'Burgundy wine is dry. Red Burgundy is made from Pinot Noir and white Burgundy, including Chablis, from Chardonnay.',
  },
  {
    q: 'Is Rioja sweet or dry?',
    a: 'Rioja red is dry. It is made mainly from Tempranillo, and oak ageing adds vanilla and coconut notes, not sugar.',
  },
  {
    q: 'Why does a dry wine sometimes taste sweet?',
    a: 'Ripe fruit flavours, high alcohol and vanilla from oak all give an impression of sweetness. A wine can taste fruity and still be dry, because dry only means little sugar is left after fermentation.',
  },
];

export default function SweetOrDryChartPage() {
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
      { '@type': 'ListItem', position: 3, name: 'Sweet or Dry Wine Chart', item: PAGE_URL },
    ],
  };

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([articleJsonLd, faqJsonLd, breadcrumbJsonLd]) }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/?lang=en">Home</Link> / <Link href="/guide">Guides</Link> / Sweet or Dry Wine Chart
        </nav>

        <h1 className={styles.h1}>Sweet or Dry? Wine Sweetness Chart by Grape</h1>
        <p className={styles.subtitle}>
          The 12 principal WSET grapes at a glance. Updated {formatDateEn(GUIDE.dateModified)}.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            Wines from 11 of the 12 principal grapes are <strong>usually dry</strong>. The exception is{' '}
            <strong>Riesling</strong>, which is made in every style from bone dry to lusciously sweet.
            Fruity is not the same as sweet: ripe fruit, high alcohol and oak can make a dry wine taste
            sweet.
          </p>
        </div>

        <h2 className={styles.sectionTitle}>Sweetness, body, acidity and tannin by grape</h2>
        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">Grape</th>
                <th scope="col">Usually</th>
                <th scope="col">Well-known sweet versions</th>
                <th scope="col">Body</th>
                <th scope="col">Acidity</th>
                <th scope="col">Tannin</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.slug}>
                  <th scope="row">
                    <Link href={`/grape/${r.slug}`}>{r.grape}</Link> ({r.colour.toLowerCase()})
                  </th>
                  <td>{r.usually}</td>
                  <td>{r.sweetVersions}</td>
                  <td>{r.body}</td>
                  <td>{r.acidity}</td>
                  <td>{r.tannin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>Why a dry wine can taste sweet</h2>
          <p>
            Dry means that almost all the grape sugar was turned into alcohol during fermentation. Three
            things still make a dry wine seem sweet: ripe fruit flavours such as plum or strawberry, high
            alcohol, which feels rich and slightly sweet, and new oak, which adds vanilla. Merlot, Grenache
            and warm-climate Shiraz are the reds most often mistaken for sweet wines.
          </p>

          <h2 className={styles.sectionTitle}>Label words that tell you the sweetness</h2>
          <p>
            For still wines, <em>sec</em> (French), <em>secco</em> (Italian), <em>seco</em> (Spanish) and{' '}
            <em>trocken</em> (German) mean dry. <em>Demi-sec</em>, <em>halbtrocken</em> and{' '}
            <em>feinherb</em> mean off-dry to medium. <em>Doux</em>, <em>dolce</em>, <em>dulce</em> and{' '}
            <em>süß</em> mean sweet. For sparkling wine the EU label terms below set the sugar level; note
            that Extra Dry is sweeter than Brut.
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">Sparkling label</th>
                <th scope="col">Sugar</th>
                <th scope="col">Tastes</th>
              </tr>
            </thead>
            <tbody>
              {SPARKLING.map((s) => (
                <tr key={s.term}>
                  <th scope="row">{s.term}</th>
                  <td>{s.sugar}</td>
                  <td>{s.taste}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className={styles.cta}>
          <h2>Test yourself on grape styles</h2>
          <p>
            Grape characteristics are among the most-missed WSET Level 2 topics. Try the free practice
            questions, then practise with the Eclavin app’s 2,000+ questions.
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
            <Link href="/grape">All grape varieties</Link>
            <Link href="/glossary/sweetness?lang=en">Sweetness in wine</Link>
            <Link href="/practice/wset-level-2?lang=en">Level 2 practice questions</Link>
          </div>
        </section>

        <ChangeLog changes={GUIDE.changes} />
      </article>
    </main>
  );
}

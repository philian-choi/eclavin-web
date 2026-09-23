import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import { getGuide } from '@/lib/guidesConfig';
import ChangeLog from '@/components/ChangeLog';
import { APP_QUESTIONS, APP_STORE_URL, BASE_URL, ORG_REF, SITE_QUESTIONS_PER_LEVEL, WSET_SPECIFICATIONS, formatDateEn, jsonLd, ogImage } from '@/lib/site';
import styles from '../../practice/practice.module.css';

/**
 * Built from Search Console demand (2026-09): "wset level 2 cheat sheet" ranked 36
 * with no page for it. The question weighting, grape lists and GIs follow the
 * official Level 2 specification (issue 2.1, 2026); the style notes match the
 * /grape and pairing pages.
 */
const PAGE_URL = `${BASE_URL}/guide/wset-level-2-cheat-sheet`;
const GUIDE = getGuide('wset-level-2-cheat-sheet')!;

// English-only and identical for every visitor: prerender it (and keep <html lang="en">).
export const dynamic = 'force-static';

const TITLE = 'WSET Level 2 Cheat Sheet: Syllabus on One Page | Eclavin';
const DESCRIPTION =
  'The WSET Level 2 wine syllabus on one page: how many questions each topic gets, the 8 principal grapes and their regions, labels, sparkling, fortified, food.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: GUIDE.title,
    description: 'The whole WSET Level 2 wine syllabus on one page, with the official question weighting.',
    type: 'article',
    url: PAGE_URL,
    images: [ogImage(GUIDE.title, 'WSET study guide')],
  },
  twitter: { card: 'summary_large_image', images: [ogImage(GUIDE.title, 'WSET study guide')] },
};

// Questions per learning outcome, from the specification's examination weighting.
const WEIGHTING = [
  { topic: 'Principal grapes and their regions', questions: 19 },
  { topic: 'Regionally important grapes', questions: 12 },
  { topic: 'Sparkling and fortified wines', questions: 6 },
  { topic: 'Vineyard: climate, weather and grape growing', questions: 5 },
  { topic: 'Winemaking and bottle ageing', questions: 4 },
  { topic: 'Storage, service and food pairing', questions: 4 },
];

const PRINCIPAL = [
  { slug: 'cabernet-sauvignon', grape: 'Cabernet Sauvignon', style: 'Blackcurrant; high tannin and acidity; full body', where: 'Bordeaux Left Bank (Haut-Médoc, Pauillac, Margaux), Napa Valley, Coonawarra, Maipo Valley' },
  { slug: 'merlot', grape: 'Merlot', style: 'Plum; softer tannin; medium to full body', where: 'Saint-Émilion, Pomerol, Chile’s Central Valley, Hawke’s Bay' },
  { slug: 'pinot-noir', grape: 'Pinot Noir', style: 'Red cherry, strawberry; low tannin, high acidity; light to medium body', where: 'Burgundy (Gevrey-Chambertin, Pommard), Oregon, Central Otago, Yarra Valley' },
  { slug: 'syrah-shiraz', grape: 'Syrah / Shiraz', style: 'Black fruit and black pepper when cooler; riper and spicier when warm', where: 'Northern Rhône (Hermitage, Côte Rôtie), Barossa Valley, Hunter Valley' },
  { slug: 'chardonnay', grape: 'Chardonnay', style: 'Green apple when cool (Chablis) to tropical when warm; often oaked', where: 'Burgundy (Chablis, Meursault, Pouilly-Fuissé), California, Adelaide Hills' },
  { slug: 'sauvignon-blanc', grape: 'Sauvignon Blanc', style: 'Grass, gooseberry; high acidity; usually unoaked', where: 'Sancerre, Pouilly-Fumé, Marlborough; blended with Sémillon in Bordeaux' },
  { slug: 'riesling', grape: 'Riesling', style: 'Floral and citrus; high acidity; dry to very sweet', where: 'Mosel, Rheingau, Pfalz, Alsace, Clare Valley, Eden Valley' },
  { slug: 'pinot-grigio-gris', grape: 'Pinot Grigio / Gris', style: 'Light and crisp in Italy; riper and fuller in Alsace', where: 'Veneto, Delle Venezie, Friuli; Alsace' },
];

const REGIONAL = [
  { grape: 'Gamay', where: 'Beaujolais, Fleurie' },
  { grape: 'Grenache / Garnacha', where: 'Châteauneuf-du-Pape, Côtes du Rhône, Rioja, Priorat, Barossa, McLaren Vale' },
  { grape: 'Tempranillo', where: 'Rioja, Ribera del Duero' },
  { grape: 'Nebbiolo', where: 'Barolo, Barbaresco' },
  { grape: 'Barbera', where: 'Barbera d’Asti' },
  { grape: 'Sangiovese', where: 'Chianti, Chianti Classico, Brunello di Montalcino' },
  { grape: 'Corvina', where: 'Valpolicella, Amarone' },
  { grape: 'Montepulciano', where: 'Montepulciano d’Abruzzo' },
  { grape: 'Zinfandel / Primitivo', where: 'California, Puglia' },
  { grape: 'Pinotage', where: 'South Africa (Cape Blend)' },
  { grape: 'Carmenère', where: 'Chile’s Central Valley' },
  { grape: 'Malbec', where: 'Mendoza' },
  { grape: 'Chenin Blanc', where: 'Vouvray, South Africa' },
  { grape: 'Sémillon', where: 'Sauternes, Hunter Valley' },
  { grape: 'Viognier', where: 'Condrieu' },
  { grape: 'Gewurztraminer', where: 'Alsace' },
  { grape: 'Verdicchio, Cortese, Garganega, Fiano', where: 'Verdicchio dei Castelli di Jesi, Gavi, Soave, Fiano di Avellino' },
  { grape: 'Albariño', where: 'Rías Baixas' },
  { grape: 'Furmint', where: 'Tokaj (Aszú)' },
];

const faqItems = [
  {
    q: 'What is the most important topic for WSET Level 2?',
    a: 'Grapes. By the official weighting, 19 of the 50 questions are on the eight principal grapes and their regions, and 12 more are on the regionally important grapes. That is 31 of 50 questions.',
  },
  {
    q: 'What are the 8 principal grapes at WSET Level 2?',
    a: 'Cabernet Sauvignon, Merlot, Pinot Noir and Syrah/Shiraz (black), and Chardonnay, Sauvignon Blanc, Riesling and Pinot Grigio/Pinot Gris (white).',
  },
  {
    q: 'Is there a tasting exam at WSET Level 2?',
    a: 'No. The Level 2 exam is 50 multiple-choice questions in 60 minutes. Tasting is taught in class but not examined; the blind tasting exam starts at Level 3.',
  },
  {
    q: 'Can I use this cheat sheet in the exam?',
    a: 'No. The exam is closed-book. Use this page to revise and to spot gaps, then test yourself with practice questions.',
  },
];

export default function Level2CheatSheetPage() {
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
    citation: WSET_SPECIFICATIONS[2].url,
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
      { '@type': 'ListItem', position: 3, name: 'WSET Level 2 Cheat Sheet', item: PAGE_URL },
    ],
  };

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([articleJsonLd, faqJsonLd, breadcrumbJsonLd]) }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/?lang=en">Home</Link> / <Link href="/guide">Guides</Link> / Level 2 Cheat Sheet
        </nav>

        <h1 className={styles.h1}>WSET Level 2 Cheat Sheet</h1>
        <p className={styles.subtitle}>
          The Level 2 wine syllabus on one page, for revision. Updated {formatDateEn(GUIDE.dateModified)}.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            The exam is <strong>50 multiple-choice questions in 60 minutes</strong>; 28 correct answers pass.{' '}
            <strong>31 of the 50 questions are about grapes</strong>: 19 on the eight principal grapes and 12 on
            the regional ones. Learn each grape with its style and its regions first, then sparkling and
            fortified wines, then the rest.
          </p>
        </div>

        <h2 className={styles.sectionTitle}>Where the 50 questions come from</h2>
        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">Topic</th>
                <th scope="col">Questions</th>
              </tr>
            </thead>
            <tbody>
              {WEIGHTING.map((w) => (
                <tr key={w.topic}>
                  <th scope="row">{w.topic}</th>
                  <td>{w.questions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className={styles.sectionTitle}>The 8 principal grapes</h2>
        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">Grape</th>
                <th scope="col">Style</th>
                <th scope="col">Regions to know</th>
              </tr>
            </thead>
            <tbody>
              {PRINCIPAL.map((g) => (
                <tr key={g.slug}>
                  <th scope="row">
                    <Link href={`/grape/${g.slug}`}>{g.grape}</Link>
                  </th>
                  <td>{g.style}</td>
                  <td>{g.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className={styles.sectionTitle}>Regional grapes and where they grow</h2>
        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">Grape</th>
                <th scope="col">Region or wine</th>
              </tr>
            </thead>
            <tbody>
              {REGIONAL.map((g) => (
                <tr key={g.grape}>
                  <th scope="row">{g.grape}</th>
                  <td>{g.where}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>Climate in one line</h2>
          <p>
            Cool climate: higher acidity, lighter body, lower alcohol, green and citrus or red fruit. Warm
            climate: lower acidity, fuller body, higher alcohol, riper tropical or black fruit.
          </p>

          <h2 className={styles.sectionTitle}>Winemaking in five lines</h2>
          <p>
            Yeast turns sugar into alcohol and carbon dioxide. Reds ferment warmer to extract colour and
            tannin; whites ferment cooler to keep fruity aromas. Malolactic conversion softens acidity and
            can add a buttery note. Lees add texture and a bready note. New and small oak barrels give more
            vanilla and toast than old or large ones.
          </p>

          <h2 className={styles.sectionTitle}>Label terms that come up</h2>
          <p>
            <strong>Germany</strong>, riper to sweeter: Kabinett, Spätlese, Auslese, Beerenauslese,
            Trockenbeerenauslese, plus Eiswein; <em>trocken</em> means dry. <strong>Spain</strong>, older with
            each step: Joven, Crianza, Reserva, Gran Reserva. <strong>Italy</strong>: Classico is the
            original heart of a region; Riserva means longer ageing. <strong>Burgundy</strong>: Premier Cru
            below Grand Cru. <strong>Sparkling</strong>: Brut is dry and Demi-Sec medium-sweet.
          </p>

          <h2 className={styles.sectionTitle}>Sparkling in two methods</h2>
          <p>
            Traditional method: the second fermentation happens in the bottle, and time on the lees adds
            bread and biscuit notes. Champagne, Cava and Cap Classique are made this way. Tank method: the
            second fermentation happens in a sealed tank, which keeps fresh fruit. Prosecco (from Glera) and
            sweet, low-alcohol Asti (from Moscato) are made this way.
          </p>

          <h2 className={styles.sectionTitle}>Fortified: Sherry and Port</h2>
          <p>
            <strong>Sherry</strong> is fortified after fermentation, so the base wine is dry. Fino ages under
            a layer of yeast called flor and stays pale and dry; Oloroso ages in contact with air and turns
            brown, nutty and dry; Amontillado has both. Pale Cream, Medium and Cream are sweetened, and PX is
            naturally very sweet. <strong>Port</strong> is fortified during fermentation, which stops it and
            leaves it sweet. Ruby, Reserve, LBV and Vintage keep fruity; Tawny ages in contact with air and
            turns nutty.
          </p>

          <h2 className={styles.sectionTitle}>Service, storage and faults</h2>
          <p>
            Sparkling and sweet wines: well chilled. Light and medium whites and rosés: chilled. Full-bodied
            whites: lightly chilled. Light reds: lightly chilled or room temperature. Medium and full reds:
            room temperature. Store wine cool, at a steady temperature, in the dark, with cork-sealed bottles
            on their side. Faults to know: cork taint (musty, damp cardboard), a failed closure (the wine
            has been exposed to air) and heat damage (cooked, stewed fruit).
          </p>

          <h2 className={styles.sectionTitle}>Food and wine</h2>
          <p>
            Sweetness and umami in food make wine taste more bitter and acidic, so the wine should be at
            least as sweet as the food. Salt and acid in food make wine taste softer and fruitier. Chilli heat
            makes alcohol burn more, so choose lower-alcohol, off-dry wines. More in the{' '}
            <Link href="/guide/wset-food-and-wine-pairing">food and wine pairing guide</Link>.
          </p>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
            Question weighting, grape lists and regions follow the official{' '}
            <a href={WSET_SPECIFICATIONS[2].url} rel="noopener">WSET Level 2 Award in Wines specification</a>{' '}
            ({WSET_SPECIFICATIONS[2].issue}). This page is a summary, not the full syllabus.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Turn the sheet into recall</h2>
          <p>
            Reading a summary is not the same as remembering it. Try the {SITE_QUESTIONS_PER_LEVEL} free Level 2 questions, then
            practise with the Eclavin app’s {APP_QUESTIONS.en} questions.
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
            <Link href="/practice/wset-level-2?lang=en">Level 2 practice questions</Link>
            <Link href="/guide/how-to-pass-wset-level-2">How to pass Level 2</Link>
            <Link href="/guide/sweet-or-dry-wine-chart">Sweet or dry? Grape chart</Link>
          </div>
        </section>

        <ChangeLog changes={GUIDE.changes} />
      </article>
    </main>
  );
}

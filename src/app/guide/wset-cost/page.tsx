import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import { getGuide } from '@/lib/guidesConfig';
import ChangeLog from '@/components/ChangeLog';
import { APP_QUESTIONS, APP_STORE_URL, BASE_URL, ORG_REF, formatDateEn, jsonLd, ogImage } from '@/lib/site';
import styles from '../../practice/practice.module.css';

/**
 * Built from Search Console demand (2026-09): "wset cost", "wset price" and
 * "wset level 2 cost" ranked 3-18 with no page that gave numbers. WSET does not
 * publish one price; each approved provider sets its own. We quote three
 * providers' public list prices, read from their own pages on PRICES_CHECKED.
 * Re-check them before moving dateModified.
 */
const PAGE_URL = `${BASE_URL}/guide/wset-cost`;
const GUIDE = getGuide('wset-cost')!;
const PRICES_CHECKED = '2026-09-23';

// English-only and identical for every visitor: prerender it (and keep <html lang="en">).
export const dynamic = 'force-static';

const TITLE = 'WSET Cost in 2026: Level 1, 2 and 3 Course Prices | Eclavin';
const DESCRIPTION =
  'What WSET wine courses cost in 2026: Level 2 is about £465-630 in London, $699 online in the US and ₩1,170,000 in Seoul, exam included. Levels 1 and 3 too.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: GUIDE.title,
    description: 'Real 2026 list prices for WSET Levels 1, 2 and 3 from providers in the UK, the US and Korea.',
    type: 'article',
    url: PAGE_URL,
    images: [ogImage(GUIDE.title, 'WSET exam reference')],
  },
  twitter: { card: 'summary_large_image', images: [ogImage(GUIDE.title, 'WSET exam reference')] },
};

const PROVIDERS = {
  london: {
    name: 'WSET School London',
    where: 'London, UK',
    urls: {
      1: 'https://www.wsetglobal.com/wset-school-london/wset-courses/wset-level-1-award-in-wines',
      2: 'https://www.wsetglobal.com/wset-school-london/wset-courses/wset-level-2-award-in-wines',
      3: 'https://www.wsetglobal.com/wset-school-london/wset-courses/wset-level-3-award-in-wines',
    } as Record<number, string>,
  },
  napa: {
    name: 'Napa Valley Wine Academy',
    where: 'online, US',
    urls: {
      1: 'https://napavalleywineacademy.com/products/wset-level-1-award-in-wines-online-course',
      2: 'https://napavalleywineacademy.com/products/wset-level-2-award-in-wines-online-course',
      3: 'https://napavalleywineacademy.com/products/wset-level-3-award-in-wines-online-course',
    } as Record<number, string>,
  },
  seoul: {
    name: 'Wine Vision Academy',
    where: 'Seoul, Korea',
    urls: {
      1: 'https://www.winevision.kr/shop_view/?idx=2',
      2: 'https://www.winevision.kr/shop_view/?idx=3',
      3: 'https://www.winevision.kr/shop_view/?idx=7',
    } as Record<number, string>,
  },
};

// List prices as shown on each provider's page. All include the exam.
const ROWS = [
  { level: 1, london: '£250 in person, £210 online', napa: '$329', seoul: '₩420,000' },
  { level: 2, london: '£630 in person, £465 online', napa: '$699', seoul: '₩1,170,000' },
  { level: 3, london: '£995 in person, £755 online', napa: '$1,135', seoul: '₩2,190,000' },
];

const faqItems = [
  {
    q: 'How much does WSET Level 2 cost?',
    a: 'In 2026, list prices for WSET Level 2 in wines with the exam included were £630 in person or £465 online at WSET School London, $699 for an instructor-led online course at Napa Valley Wine Academy in the US, and ₩1,170,000 at Wine Vision Academy in Seoul.',
  },
  {
    q: 'How much does WSET Level 1 cost?',
    a: 'Around £210 to £250 in London, $329 online in the US and ₩420,000 in Seoul in 2026, exam included.',
  },
  {
    q: 'How much does WSET Level 3 cost?',
    a: 'Around £755 to £995 in London, $1,135 online in the US and ₩2,190,000 in Seoul in 2026, exam included. Online courses usually do not include the wines, and a Level 3 tasting kit adds a few hundred dollars.',
  },
  {
    q: 'Who sets the price of a WSET course?',
    a: 'Each approved programme provider sets its own price. WSET writes the syllabus and sets the exams, but it does not publish one price for everyone, so the same level can cost very different amounts in different cities.',
  },
  {
    q: 'How much is a WSET resit?',
    a: 'It depends on the provider. Napa Valley Wine Academy, for example, listed resits at $150 for Level 1, $220 for Level 2, and $225 for one Level 3 unit or $280 for both in 2026.',
  },
];

export default function WsetCostPage() {
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
      { '@type': 'ListItem', position: 3, name: 'WSET Cost', item: PAGE_URL },
    ],
  };

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([articleJsonLd, faqJsonLd, breadcrumbJsonLd]) }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/?lang=en">Home</Link> / <Link href="/guide">Guides</Link> / WSET Cost
        </nav>

        <h1 className={styles.h1}>How Much Does WSET Cost?</h1>
        <p className={styles.subtitle}>
          Real list prices for Levels 1, 2 and 3 in wines, checked on {formatDateEn(PRICES_CHECKED)}.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET® or any provider below
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            There is no single price: each approved provider sets its own. In 2026,{' '}
            <strong>Level 2 cost £465 to £630 in London, $699 online in the US and ₩1,170,000 in Seoul</strong>,
            with the exam included. Level 1 costs less than half of that, and Level 3 about one and a half
            to two times as much.
          </p>
        </div>

        <h2 className={styles.sectionTitle}>WSET wine course prices by level, 2026</h2>
        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">Level</th>
                <th scope="col">
                  {PROVIDERS.london.name} ({PROVIDERS.london.where})
                </th>
                <th scope="col">
                  {PROVIDERS.napa.name} ({PROVIDERS.napa.where})
                </th>
                <th scope="col">
                  {PROVIDERS.seoul.name} ({PROVIDERS.seoul.where})
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.level}>
                  <th scope="row">Level {r.level}</th>
                  <td>
                    <a href={PROVIDERS.london.urls[r.level]} rel="noopener">{r.london}</a>
                  </td>
                  <td>
                    <a href={PROVIDERS.napa.urls[r.level]} rel="noopener">{r.napa}</a>
                  </td>
                  <td>
                    <a href={PROVIDERS.seoul.urls[r.level]} rel="noopener">{r.seoul}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.prose}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
            List prices from each provider’s own course page (linked in the table), checked on{' '}
            {formatDateEn(PRICES_CHECKED)}. All include the exam. These are three examples, not a full
            survey; prices change and discounts come and go, so check the provider before you book.
          </p>

          <h2 className={styles.sectionTitle}>What the price includes</h2>
          <p>
            In-person courses usually include the textbook or workbook, the wines tasted in class, the
            teaching and the exam. At WSET School London, for example, the in-person Level 2 course
            includes 44 wine samples and 16 hours of teaching. Online courses cost less because the wines
            are not included: you buy them yourself or order a tasting kit. Napa Valley Wine Academy, for
            example, listed its kits at $130 for Level 2 and $282 for Level 3.
          </p>

          <h2 className={styles.sectionTitle}>Costs people forget</h2>
          <p>
            Resits, if you fail: at Napa Valley Wine Academy they were $150 for Level 1, $220 for Level 2,
            and $225 for one Level 3 unit or $280 for both. Extra wines for practice, especially for the
            Level 3 blind tasting. And your time: about 6 hours for Level 1, 28 hours for Level 2 and 84
            hours for Level 3, by WSET’s own estimate.
          </p>

          <h2 className={styles.sectionTitle}>How to spend less</h2>
          <p>
            Take an online course and buy the wines with friends. Skip Level 1 if you already know the
            basics: WSET does not require it before Level 2. And prepare well enough to pass the first
            time, because a resit costs more than practice does.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Pass the first time</h2>
          <p>
            A resit costs more than practice. Try the free practice questions with explanations, then
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
            <Link href="/guide/is-wset-worth-it">Is WSET worth it?</Link>
            <Link href="/guide/wset-exam-facts">All WSET exam facts</Link>
            <Link href="/practice?lang=en">Free WSET practice exams</Link>
          </div>
        </section>

        <ChangeLog changes={GUIDE.changes} />
      </article>
    </main>
  );
}

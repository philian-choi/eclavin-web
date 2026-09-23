import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import { getGuide } from '@/lib/guidesConfig';
import ChangeLog from '@/components/ChangeLog';
import {
  APP_QUESTIONS,
  APP_STORE_URL,
  BASE_URL,
  EXAM_FACTS_CHECKED,
  ORG_REF,
  WSET_SPECIFICATIONS,
  formatDateEn,
  jsonLd,
  ogImage,
} from '@/lib/site';
import styles from '../../practice/practice.module.css';

/**
 * Built from Search Console demand (2026-09): "wset pass with merit", "wset level 2
 * pass with merit" and "wset pass levels" ranked 7-27 with no page that answered
 * them. Every band below is quoted from the official WSET specifications linked
 * on the page (Level 1 issue 1.2, Level 2 issue 2.1, Level 3 issue 2).
 */
const PAGE_URL = `${BASE_URL}/guide/wset-pass-merit-distinction`;
const GUIDE = getGuide('wset-pass-merit-distinction')!;

// English-only and identical for every visitor: prerender it (and keep <html lang="en">).
export const dynamic = 'force-static';

const TITLE = 'WSET Pass, Merit & Distinction Marks by Level | Eclavin';
const DESCRIPTION =
  'WSET grade bands from the official specifications: Level 2 Merit is 70% (35 of 50), Distinction 85% (43 of 50). Level 3 needs 80%. Level 1 is pass or fail.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: GUIDE.title,
    description: 'Every WSET wine grade band, Pass, Merit and Distinction, with the number of correct answers.',
    type: 'article',
    url: PAGE_URL,
    images: [ogImage(GUIDE.title, 'WSET exam reference')],
  },
  twitter: { card: 'summary_large_image', images: [ogImage(GUIDE.title, 'WSET exam reference')] },
};

// Level 2: 50 one-mark questions. Correct-answer counts are the percentages
// rounded up to whole questions.
const LEVEL2 = [
  { grade: 'Pass with Distinction', mark: '85% or more', correct: '43 to 50' },
  { grade: 'Pass with Merit', mark: '70% to 84%', correct: '35 to 42' },
  { grade: 'Pass', mark: '55% to 69%', correct: '28 to 34' },
  { grade: 'Fail', mark: '45% to 54%', correct: '23 to 27' },
  { grade: 'Fail unclassified', mark: '44% or below', correct: '22 or fewer' },
];

const LEVEL3 = [
  { grade: 'Pass with Distinction', mark: '80% or more overall, and no paper below 65%' },
  { grade: 'Pass with Merit', mark: '65% to 79% overall' },
  { grade: 'Pass', mark: '55% to 64% overall' },
  { grade: 'Fail', mark: '45% to 54% overall' },
  { grade: 'Fail unclassified', mark: '44% or below overall' },
];

const faqItems = [
  {
    q: 'What is a Pass with Merit in WSET?',
    a: 'At Level 2, Pass with Merit is a mark of 70% to 84%, which is 35 to 42 correct answers out of 50. At Level 3 it is an aggregate mark of 65% to 79% across all the exam papers. Level 1 has no Merit grade.',
  },
  {
    q: 'How many questions do I need for a Distinction at WSET Level 2?',
    a: 'You need 85% or more, which is 43 correct answers out of 50. To pass you need 55%, which is 28 correct answers.',
  },
  {
    q: 'What do I need for a Distinction at WSET Level 3?',
    a: 'An aggregate mark of 80% or more with no individual paper below 65%. The papers are the multiple-choice paper, the written short-answer paper and the blind tasting.',
  },
  {
    q: 'Does WSET Level 1 have Merit or Distinction?',
    a: 'No. Level 1 is graded Pass or Fail only. You pass with 70%, which is 21 correct answers out of 30.',
  },
  {
    q: 'Can I retake a WSET exam to improve my grade?',
    a: 'No. Candidates who have passed may not retake the exam to improve their grade. If you fail, you may resit as often as you need. At Level 3, a candidate who resits a failed unit can get Pass with Merit at most.',
  },
];

export default function WsetGradesPage() {
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
    citation: [1, 2, 3].map((l) => WSET_SPECIFICATIONS[l].url),
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
      { '@type': 'ListItem', position: 3, name: 'WSET Pass, Merit and Distinction', item: PAGE_URL },
    ],
  };

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd([articleJsonLd, faqJsonLd, breadcrumbJsonLd]) }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/?lang=en">Home</Link> / <Link href="/guide">Guides</Link> / Pass, Merit and Distinction
        </nav>

        <h1 className={styles.h1}>WSET Pass, Merit and Distinction: Grade Bands by Level</h1>
        <p className={styles.subtitle}>
          The official grade bands for WSET Levels 1, 2 and 3 in wines. Updated {formatDateEn(GUIDE.dateModified)}.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            <strong>Level 1</strong> is pass or fail: 70% (21 of 30) passes. <strong>Level 2</strong> passes
            at 55% (28 of 50), gives a <strong>Merit at 70%</strong> (35 of 50) and a{' '}
            <strong>Distinction at 85%</strong> (43 of 50). <strong>Level 3</strong> needs 55% in every
            paper to pass, then grades your overall mark: Merit at 65%, Distinction at 80% with no paper
            below 65%.
          </p>
        </div>

        <h2 className={styles.sectionTitle}>Level 2: grade bands and correct answers</h2>
        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">Grade</th>
                <th scope="col">Mark</th>
                <th scope="col">Correct out of 50</th>
              </tr>
            </thead>
            <tbody>
              {LEVEL2.map((r) => (
                <tr key={r.grade}>
                  <th scope="row">{r.grade}</th>
                  <td>{r.mark}</td>
                  <td>{r.correct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.prose}>
          <p>
            Each question is worth one mark and wrong answers lose nothing, so answer every question. The
            gap between Pass and Merit is seven questions, and between Merit and Distinction eight.
          </p>

          <h2 className={styles.sectionTitle}>Level 3: pass every paper, then an overall grade</h2>
          <p>
            Level 3 has a theory unit and a tasting unit. The theory unit is two papers taken in two hours:
            50 multiple-choice questions, and four written questions worth 25 marks each. The tasting unit
            is a 30-minute blind tasting of two wines. To pass you need <strong>55% in each paper</strong>{' '}
            on its own; a strong multiple-choice score does not rescue a weak written paper. Once you
            pass both units, WSET grades your aggregate mark across all the papers.
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">Grade</th>
                <th scope="col">Mark needed</th>
              </tr>
            </thead>
            <tbody>
              {LEVEL3.map((r) => (
                <tr key={r.grade}>
                  <th scope="row">{r.grade}</th>
                  <td>{r.mark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.prose}>
          <p>
            The Distinction rule has two parts. An 80% average is not enough if one paper, often the
            tasting, falls below 65%. And a resit limits you: a candidate who resits a failed unit can
            get Pass with Merit at most.
          </p>

          <h2 className={styles.sectionTitle}>Level 1: pass or fail</h2>
          <p>
            Level 1 is 30 multiple-choice questions in 45 minutes. A mark of 70% or more, which is 21
            correct answers, is a Pass. There is no Merit or Distinction.
          </p>

          <h2 className={styles.sectionTitle}>Resits and retakes</h2>
          <p>
            At every level you may resit a failed exam, with no limit on attempts. You may not retake a
            passed exam to raise your grade, so aim for your target grade the first time.
          </p>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
            Sources: the official WSET specifications for{' '}
            <a href={WSET_SPECIFICATIONS[1].url} rel="noopener">Level 1</a> ({WSET_SPECIFICATIONS[1].issue}),{' '}
            <a href={WSET_SPECIFICATIONS[2].url} rel="noopener">Level 2</a> ({WSET_SPECIFICATIONS[2].issue}) and{' '}
            <a href={WSET_SPECIFICATIONS[3].url} rel="noopener">Level 3</a> ({WSET_SPECIFICATIONS[3].issue}),
            checked on {formatDateEn(EXAM_FACTS_CHECKED)}. WSET may change grade thresholds; confirm with
            your course provider before the exam. Correct-answer counts are our arithmetic from the
            percentages.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Aim for Merit or Distinction</h2>
          <p>
            The difference between a Pass and a Distinction at Level 2 is 15 questions. Try the free
            practice questions, then practise with the Eclavin app’s {APP_QUESTIONS.en} questions.
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
            <Link href="/guide/wset-exam-facts">All WSET exam facts</Link>
            <Link href="/guide/how-to-pass-wset-level-2">How to pass Level 2</Link>
            <Link href="/practice/wset-level-2?lang=en">Level 2 practice questions</Link>
          </div>
        </section>

        <ChangeLog changes={GUIDE.changes} />
      </article>
    </main>
  );
}

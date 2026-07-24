import { Metadata } from 'next';
import Link from 'next/link';
import TrackedAppStoreLink from '@/components/TrackedAppStoreLink';
import styles from '../../practice/practice.module.css';

const BASE_URL = 'https://www.eclavin.com';
const PAGE_URL = `${BASE_URL}/guide/best-wset-study-apps`;
const APP_STORE_URL =
  'https://apps.apple.com/kr/app/eclavin-%EA%B5%AD%EC%A0%9C-%EC%99%80%EC%9D%B8-%EC%9E%90%EA%B2%A9%EC%A6%9D-%ED%95%A9%EA%B2%A9-%EC%B9%98%ED%8A%B8%ED%82%A4/id6757098139';
const UPDATED = '2026-07-24';

export const metadata: Metadata = {
  title: 'Best WSET Study Apps & Tools in 2026: An Honest Guide',
  description:
    'An honest, non-promotional guide to the types of WSET study tools in 2026: official courses, practice-question apps, flashcards, free quizzes, and guides, with what each is best for and how to choose.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Best WSET Study Apps & Tools in 2026: An Honest Guide',
    description:
      'The types of WSET study tools compared: official courses, practice apps, flashcards, free quizzes, and guides, and how to choose.',
    type: 'article',
    url: PAGE_URL,
    images: [`${BASE_URL}/og-image.png`],
  },
  twitter: { card: 'summary_large_image', images: [`${BASE_URL}/og-image.png`] },
};

const faqItems = [
  {
    q: 'What is the best way to study for a WSET exam?',
    a: 'Most people do best by combining an approved course or study book for the theory with active practice questions to lock in recall, plus tasting practice for Level 3. No single app replaces the course, but practice questions with explanations are the most efficient way to prepare between lessons.',
  },
  {
    q: 'Is there a free WSET practice app or website?',
    a: 'Yes. Several sites offer free WSET practice questions online, and quality varies: some show only a score, while better ones give a worked explanation for every answer. Look for free questions that reveal the correct answer and explain why, in your target level.',
  },
  {
    q: 'Do I need an app to pass WSET?',
    a: 'No. You can pass with the official study materials alone. Apps and quizzes help by making revision active and portable, which suits busy candidates who want to practise recall on their phone in short sessions.',
  },
  {
    q: 'Which WSET study tool is best for Korean speakers?',
    a: 'Almost all WSET study apps and sites are English-only. If you want to study in Korean, look for a genuinely bilingual tool that gives the same question and explanation in both Korean and English.',
  },
  {
    q: 'Is Eclavin an official WSET product?',
    a: 'No. Eclavin, which publishes this guide, is an independent study app and is not affiliated with, endorsed by, or connected to WSET. We have tried to describe the wider landscape fairly, including tools other than our own.',
  },
];

const rows: { type: string; bestFor: string; watch: string }[] = [
  {
    type: 'Official courses & study books',
    bestFor: 'The syllabus and the certificate itself; you must take an approved course to sit the exam',
    watch: 'The most expensive option; the book alone is dense to self-study',
  },
  {
    type: 'Practice-question apps',
    bestFor: 'Active recall; drilling exam-style questions with explanations',
    watch: 'Quality of explanations varies; check it covers your level',
  },
  {
    type: 'Flashcard apps',
    bestFor: 'Memorising facts, grapes, and regions through repetition',
    watch: 'Less exam-style reasoning; cards can lack context',
  },
  {
    type: 'Free web quizzes',
    bestFor: 'Quick, no-cost practice with no sign-up',
    watch: 'Some show only a score with no explanations; banks can be tiny',
  },
  {
    type: 'Guides & glossaries',
    bestFor: 'Understanding a concept or term before you drill it',
    watch: 'Reading is not the same as recall; pair with practice',
  },
];

export default function BestWsetAppsGuide() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best WSET Study Apps & Tools in 2026: An Honest Guide',
    description:
      'An honest guide to the types of WSET study tools in 2026 and how to choose one.',
    author: { '@type': 'Organization', name: 'Eclavin', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'Eclavin', url: BASE_URL },
    mainEntityOfPage: PAGE_URL,
    datePublished: UPDATED,
    dateModified: UPDATED,
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
      { '@type': 'ListItem', position: 3, name: 'Best WSET Study Apps & Tools', item: PAGE_URL },
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
          <Link href="/?lang=en">Home</Link> / <Link href="/guide">Guides</Link> / Best WSET Study
          Apps & Tools
        </nav>

        <h1 className={styles.h1}>Best WSET Study Apps & Tools in 2026</h1>
        <p className={styles.subtitle}>
          An honest guide to the main types of tools, and how to pick one. Updated 2026.
        </p>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            There is no single &ldquo;best&rdquo; WSET tool. The right choice depends on your level,
            budget, and whether you want theory practice, flashcards, or tasting help. Whatever you
            pick, look for three things: real <strong>explanations</strong> (not just a score),
            coverage of <strong>your level</strong>, and honest <strong>pricing</strong>. Most people
            combine an approved course for the syllabus with practice questions for recall.
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th scope="col">Type of tool</th>
                <th scope="col">Best for</th>
                <th scope="col">Watch out for</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.type}>
                  <th scope="row">{r.type}</th>
                  <td>{r.bestFor}</td>
                  <td>{r.watch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>How to choose</h2>
          <p>
            Start from how you learn. If you forget facts, flashcards help. If you freeze on exam-style
            questions, a practice-question app with explanations is the fastest fix. If a concept
            confuses you, read a short guide or glossary entry first, then drill it. Above all, favour
            tools that <strong>explain why</strong> an answer is right, because the exam tests reasoning,
            not just recall.
          </p>

          <h2 className={styles.sectionTitle}>What most tools get wrong</h2>
          <p>
            Two gaps are common. First, many free quizzes give only a score and no explanation, so you
            repeat mistakes. Second, nearly every tool is English-only, which leaves Korean-speaking
            candidates underserved. When you compare options, check that answers come with a worked
            explanation, and, if you need it, that the same content is available in your language.
          </p>

          <h2 className={styles.sectionTitle}>Where Eclavin fits (full disclosure)</h2>
          <p>
            This guide is published by Eclavin, so treat this section as our own pitch, not a neutral
            verdict. Eclavin is a paid study app with a free set of practice questions on this website.
            Its aim is to fill the two gaps above: every practice question comes with an expert
            explanation, and the questions, guides, and glossary are available in both English and
            Korean. It is an independent tool and is not affiliated with WSET. Other good tools exist,
            and the right one is whatever keeps you practising.
          </p>
        </div>

        <section className={styles.cta}>
          <h2>Try the free practice first</h2>
          <p>
            The best way to judge a study tool is to use it. Try Eclavin&rsquo;s free WSET practice
            questions with explanations, then decide if the full app is worth it for you.
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
          <h2>Start studying</h2>
          <div className={styles.relatedLinks}>
            <Link href="/practice">Free WSET practice exams</Link>
            <Link href="/guide/wset-levels-explained">WSET levels explained</Link>
            <Link href="/glossary">Wine &amp; WSET glossary</Link>
          </div>
        </section>
      </article>
    </main>
  );
}

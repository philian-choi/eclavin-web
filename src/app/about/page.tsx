import { Metadata } from 'next';
import Link from 'next/link';
import { GUIDES } from '@/lib/guidesConfig';
import { GLOSSARY } from '@/lib/glossaryConfig';
import { GRAPES } from '@/lib/grapeConfig';
import { REGIONS } from '@/lib/regionConfig';
import {
  BASE_URL,
  APP_STORE_URL,
  APP_QUESTIONS,
  ORGANIZATION,
  PRIVACY_URL,
  SUPPORT_EMAIL,
  SITE_QUESTIONS_PER_LEVEL,
  jsonLd,
  ogImage,
} from '@/lib/site';
import styles from '../practice/practice.module.css';

const PAGE_URL = `${BASE_URL}/about`;

// English-only and identical for every visitor: prerender it (and keep <html lang="en">).
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'About Eclavin: An Independent WSET Exam Study Resource',
  description:
    'What Eclavin is, what its free WSET practice questions and study guides cover, how the content is written, checked and corrected, and how to contact us.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'About Eclavin',
    description: 'An independent study resource for the WSET wine exams: free practice questions, guides and a glossary.',
    type: 'website',
    url: PAGE_URL,
    siteName: 'Eclavin',
    images: [ogImage('About Eclavin', 'Independent WSET study resource')],
  },
  twitter: { card: 'summary_large_image', images: [ogImage('About Eclavin', 'Independent WSET study resource')] },
};

export default function AboutPage() {
  const siteQuestions = SITE_QUESTIONS_PER_LEVEL * 2;

  const ld = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': PAGE_URL,
      url: PAGE_URL,
      name: 'About Eclavin',
      inLanguage: 'en',
      mainEntity: { '@id': ORGANIZATION['@id'] },
    },
    { '@context': 'https://schema.org', ...ORGANIZATION },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/?lang=en` },
        { '@type': 'ListItem', position: 2, name: 'About', item: PAGE_URL },
      ],
    },
  ];

  return (
    <main className="main-container">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ld) }} />

      <article className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/?lang=en">Home</Link> / About
        </nav>

        <h1 className={styles.h1}>About Eclavin</h1>
        <span className={styles.disclaimer}>
          Unofficial study resource · not affiliated with or endorsed by WSET®
        </span>

        <div className={styles.answerBox}>
          <h2>The short answer</h2>
          <p>
            Eclavin is an independent study resource for the WSET wine exams. This website has{' '}
            {siteQuestions} free practice questions ({SITE_QUESTIONS_PER_LEVEL} for Level 1 and{' '}
            {SITE_QUESTIONS_PER_LEVEL} for Level 2) in English and Korean, {GUIDES.length} study guides, a{' '}
            {GLOSSARY.length}-term glossary, and profiles of {GRAPES.length} grape varieties and{' '}
            {REGIONS.length} wine regions. The Eclavin iOS app has {APP_QUESTIONS.en} questions across Levels 1,
            2 and 3.
          </p>
        </div>

        <div className={styles.prose}>
          <h2 className={styles.sectionTitle}>Not affiliated with WSET</h2>
          <p>
            Eclavin is not affiliated with, endorsed by, or sponsored by the Wine &amp; Spirit Education
            Trust (WSET). WSET is a trademark of the Wine &amp; Spirit Education Trust. The practice
            questions are original and written in the style of the multiple-choice exams. They are not
            copies of real exam papers.
          </p>

          <h2 className={styles.sectionTitle}>How the content is made</h2>
          <p>
            The questions and explanations follow the topics of WSET&apos;s published Level 1 and Level 2
            specifications. Every question has a worked explanation of why the right answer is right and
            why the others are wrong. Exam facts such as question counts, exam length and study hours are
            collected on <Link href="/guide/wset-exam-facts">WSET exam facts</Link>, with links to the
            official WSET qualification pages they come from.
          </p>
          <p>
            Each guide shows the date it was last updated. If you spot a mistake, email{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we will correct it.
          </p>

          <h2 className={styles.sectionTitle}>Languages</h2>
          <p>
            The practice questions, practice exams and glossary on this website are available in English
            and Korean. The study guides and the grape and region pages are in English.
          </p>

          <h2 className={styles.sectionTitle}>Contact and privacy</h2>
          <p>
            Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>. Read the{' '}
            <a href={PRIVACY_URL} rel="noopener">privacy policy</a>. The app is on the{' '}
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">App Store</a>.
          </p>
        </div>

        <section className={styles.related}>
          <h2>Start here</h2>
          <div className={styles.relatedLinks}>
            <Link href="/level/1?lang=en">All Level 1 questions</Link>
            <Link href="/level/2?lang=en">All Level 2 questions</Link>
            <Link href="/practice?lang=en">Free practice exams</Link>
            <Link href="/guide">Study guides</Link>
            <Link href="/glossary?lang=en">Glossary</Link>
          </div>
        </section>
      </article>
    </main>
  );
}

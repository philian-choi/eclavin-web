import { APP_STORE_URL, PRIVACY_URL, SUPPORT_EMAIL, type Lang } from '@/lib/site';
import styles from './SiteFooter.module.css';

/**
 * Site-wide footer. It gives every page a crawlable path to each content hub
 * (the home page used to link only to practice and the question grid) and it
 * carries the "unofficial, not affiliated with WSET" notice onto every page,
 * including the home page and the question pages that were missing it.
 */
export default function SiteFooter({ lang }: { lang: Lang }) {
  const q = `?lang=${lang}`;
  const ko = lang === 'ko';

  const links = [
    { href: `/practice${q}`, label: ko ? 'WSET 무료 연습문제' : 'Free WSET practice exams' },
    { href: `/level/1${q}`, label: ko ? '1급 문제 100개' : 'All Level 1 questions' },
    { href: `/level/2${q}`, label: ko ? '2급 문제 100개' : 'All Level 2 questions' },
    { href: `/glossary${q}`, label: ko ? '와인 용어 사전' : 'Wine & WSET glossary' },
    { href: '/guide', label: ko ? '공부 안내 글 (영어)' : 'Study guides' },
    { href: '/grape', label: ko ? '포도 품종 (영어)' : 'Grape varieties' },
    { href: '/region', label: ko ? '와인 산지 (영어)' : 'Wine regions' },
    { href: '/about', label: ko ? '에클라뱅 소개 (영어)' : 'About Eclavin' },
  ];

  return (
    <footer className={styles.footer}>
      <nav aria-label={ko ? '사이트 안내' : 'Site'}>
        <ul className={styles.nav}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
          <li>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
              {ko ? '에클라뱅 앱 (App Store)' : 'Eclavin app (App Store)'}
            </a>
          </li>
        </ul>
      </nav>
      <p className={styles.disclaimer}>
        {ko
          ? '에클라뱅은 독립적으로 만든 비공식 학습 자료입니다. WSET(Wine & Spirit Education Trust)과 제휴하거나 승인·후원을 받지 않았습니다.'
          : 'Eclavin is an independent, unofficial study resource. It is not affiliated with, endorsed by, or sponsored by the Wine & Spirit Education Trust (WSET). WSET is a trademark of the Wine & Spirit Education Trust.'}
      </p>
      <p className={styles.meta}>
        © 2026 Eclavin ·{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> ·{' '}
        <a href={PRIVACY_URL} rel="noopener">
          {ko ? '개인정보 처리방침' : 'Privacy'}
        </a>{' '}
        · <a href="/llms.txt">llms.txt</a>
      </p>
    </footer>
  );
}

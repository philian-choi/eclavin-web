# Eclavin website

Source code of [www.eclavin.com](https://www.eclavin.com), a free study website for the
WSET wine exams run by Eclavin.

Eclavin is an independent, unofficial study resource. It is not affiliated with, endorsed by,
or sponsored by the Wine & Spirit Education Trust (WSET). WSET is a trademark of the Wine &
Spirit Education Trust.

## What is on the site

As of September 2026:

- **200 practice questions**, 100 for WSET Level 1 and 100 for Level 2, each on its own page
  with the answer and a worked explanation, in English and Korean
  ([Level 1](https://www.eclavin.com/level/1?lang=en), [Level 2](https://www.eclavin.com/level/2?lang=en)).
- **Practice exams**: a 20-question sample per level with instant marking
  ([practice](https://www.eclavin.com/practice?lang=en)).
- **14 study guides** in English: level comparisons, study plans, the tasting method, food and
  wine pairing ([guides](https://www.eclavin.com/guide)).
- **A 20-term glossary** in English and Korean ([glossary](https://www.eclavin.com/glossary?lang=en)).
- **Profiles of 12 grape varieties and 12 wine regions** in English
  ([grapes](https://www.eclavin.com/grape), [regions](https://www.eclavin.com/region)).
- **An exam facts table** (question counts, exam length, pass marks, study hours) that links to
  the official WSET qualification pages it is based on
  ([exam facts](https://www.eclavin.com/guide/wset-exam-facts)).

The questions are original. They are written in the style of the multiple-choice exams and
follow the topics of the published Level 1 and Level 2 specifications; they are not copies of
real exam papers. The separate Eclavin iOS app
([App Store](https://apps.apple.com/app/id6757098139)) has 2,000+ questions across Levels 1, 2
and 3.

Machine-readable summaries: [llms.txt](https://www.eclavin.com/llms.txt),
[llms-full.txt](https://www.eclavin.com/llms-full.txt), [sitemap](https://www.eclavin.com/sitemap.xml),
[RSS feed of the guides](https://www.eclavin.com/feed.xml).

Corrections and questions: support@eclavin.com.

## How the code is organised

- Next.js App Router (`src/app`). Question text lives in Markdown under `src/content`
  (`l1`, `l2` in Korean, `l1_en`, `l2_en` in English).
- Guides, glossary terms, grapes, regions and practice pages are driven by registries in
  `src/lib/*Config.ts`. The sitemap, `llms.txt`, `llms-full.txt` and the RSS feed are generated
  from the same registries, so a new page appears in all of them.
- `src/lib/site.ts` holds the site-wide facts: the one Organization entity (`@id`
  `https://www.eclavin.com/#organization`), the WSET entity used only as a subject, question
  counts, and helpers for titles, descriptions and share images.
- Bilingual pages take `?lang=en` or `?lang=ko`; without it, visitors from Korea get Korean and
  everyone else English. `src/proxy.ts` passes that choice to the root layout so `<html lang>`
  matches the page. English-only sections are prerendered.
- Share images are drawn per page by `src/app/api/og/route.tsx`.

## Develop and deploy

```bash
npm install
npm run dev      # local development
npm run build    # production build
npm run deploy   # deploy to production on Vercel, then notify IndexNow search engines
```

Deploys are run by hand; pushing to GitHub does not deploy.

Environment variables (set in Vercel):

- `NEXT_PUBLIC_POSTHOG_KEY`: analytics.
- `ADMIN_PASSWORD`: optional. Without it the `/admin` area stays locked.
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`: optional page-view logging.

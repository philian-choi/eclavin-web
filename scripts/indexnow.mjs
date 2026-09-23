// Tells IndexNow search engines (Bing, Naver, Yandex, Seznam and others) about
// pages that are new or changed. Google does not use IndexNow; it reads the
// sitemap's lastmod instead.
//
// `npm run deploy` runs this right after `vercel --prod`, so every production
// deploy notifies the search engines without anyone having to remember.
//   node scripts/indexnow.mjs            # every URL in the live sitemap
//   node scripts/indexnow.mjs /guide/x   # only these paths
//
// The key is public by design: search engines fetch https://www.eclavin.com/<key>.txt
// to confirm the request came from the site owner. Right after a deploy the
// engines may not see the key yet and answer 403, so the script waits and retries.

const HOST = 'www.eclavin.com';
const KEY = 'e76cd3bf8ecd4eb2e3e041bfdb7e9805';
const BASE = `https://${HOST}`;
const RETRIES = 6;
const WAIT_MS = 20_000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function keyIsLive() {
  for (let i = 0; i < RETRIES; i++) {
    try {
      const res = await fetch(`${BASE}/${KEY}.txt`, { cache: 'no-store' });
      if (res.ok && (await res.text()).trim() === KEY) return true;
    } catch {}
    console.log(`Key file not live yet, waiting ${WAIT_MS / 1000}s...`);
    await sleep(WAIT_MS);
  }
  return false;
}

async function urlsFromSitemap() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`, { cache: 'no-store' })).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
}

async function submit(batch) {
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList: batch }),
    });
    console.log(`IndexNow: ${batch.length} URLs -> HTTP ${res.status} ${res.statusText} (attempt ${attempt})`);
    if (res.status === 200 || res.status === 202) return true;
    // 403: key not verified yet; 429: slow down; 5xx: their side. All worth a retry.
    if (![403, 429].includes(res.status) && res.status < 500) return false;
    await sleep(WAIT_MS);
  }
  return false;
}

const args = process.argv.slice(2);
const urlList = args.length ? args.map((p) => (p.startsWith('http') ? p : `${BASE}${p}`)) : await urlsFromSitemap();

if (!(await keyIsLive())) {
  console.error(`Key file ${BASE}/${KEY}.txt is not live. Deploy first.`);
  process.exit(1);
}

// IndexNow accepts up to 10,000 URLs per request.
for (let i = 0; i < urlList.length; i += 10000) {
  if (!(await submit(urlList.slice(i, i + 10000)))) process.exit(1);
}

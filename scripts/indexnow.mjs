// Tells IndexNow search engines (Bing, Naver, Yandex, Seznam and others) about
// pages that are new or changed. Google does not use IndexNow; it reads the
// sitemap's lastmod instead.
//
// Run after every production deploy:
//   node scripts/indexnow.mjs            # every URL in the live sitemap
//   node scripts/indexnow.mjs /guide/x   # only these paths
//
// The key is public by design: search engines fetch https://www.eclavin.com/<key>.txt
// to confirm the request came from the site owner.

const HOST = 'www.eclavin.com';
const KEY = 'e76cd3bf8ecd4eb2e3e041bfdb7e9805';
const BASE = `https://${HOST}`;

async function urlsFromSitemap() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'));
}

const args = process.argv.slice(2);
const urlList = args.length ? args.map((p) => (p.startsWith('http') ? p : `${BASE}${p}`)) : await urlsFromSitemap();

const keyCheck = await fetch(`${BASE}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error(`Key file ${BASE}/${KEY}.txt is not live yet. Deploy first.`);
  process.exit(1);
}

// IndexNow accepts up to 10,000 URLs per request.
for (let i = 0; i < urlList.length; i += 10000) {
  const batch = urlList.slice(i, i + 10000);
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList: batch }),
  });
  console.log(`IndexNow: ${batch.length} URLs -> HTTP ${res.status} ${res.statusText}`);
  if (res.status >= 400) process.exit(1);
}

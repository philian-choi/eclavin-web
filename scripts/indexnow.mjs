// Tells IndexNow search engines (Bing, Naver, Yandex, Seznam and others) about
// pages that are new or changed. Google does not use IndexNow; it reads the
// sitemap's lastmod instead.
//
// `npm run deploy` runs this right after `vercel --prod`, so every production
// deploy notifies the search engines without anyone having to remember.
//   node scripts/indexnow.mjs            # sitemap URLs that are new or whose lastmod changed
//   node scripts/indexnow.mjs --all      # every URL in the sitemap
//   node scripts/indexnow.mjs /guide/x   # only these paths
//
// IndexNow asks for changed URLs only, so the last submitted lastmod of each URL
// is kept in scripts/.indexnow-state.json (not committed) and a redeploy with no
// content change submits nothing.
//
// The key is public by design: search engines fetch https://www.eclavin.com/<key>.txt
// to confirm the request came from the site owner. Right after a deploy the
// engines may not see the key yet and answer 403, so the script waits and retries.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const HOST = 'www.eclavin.com';
const KEY = 'e76cd3bf8ecd4eb2e3e041bfdb7e9805';
const BASE = `https://${HOST}`;
const RETRIES = 6;
const WAIT_MS = 20_000;
const STATE_FILE = fileURLToPath(new URL('./.indexnow-state.json', import.meta.url));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function loadState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  } catch {
    return {};
  }
}

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

async function sitemapEntries() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`, { cache: 'no-store' })).text();
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
    url: (m[1].match(/<loc>([^<]+)<\/loc>/) ?? [])[1]?.replace(/&amp;/g, '&'),
    lastmod: (m[1].match(/<lastmod>([^<]+)<\/lastmod>/) ?? [])[1] ?? '',
  })).filter((e) => e.url);
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
const all = args.includes('--all');
const paths = args.filter((a) => !a.startsWith('--'));

const state = loadState();
let entries;
if (paths.length) {
  entries = paths.map((p) => ({ url: p.startsWith('http') ? p : `${BASE}${p}`, lastmod: '' }));
} else {
  entries = await sitemapEntries();
  if (!all) entries = entries.filter((e) => state[e.url] !== e.lastmod);
}

if (!entries.length) {
  console.log('IndexNow: nothing new or changed since the last submission.');
  process.exit(0);
}

if (!(await keyIsLive())) {
  console.error(`Key file ${BASE}/${KEY}.txt is not live. Deploy first.`);
  process.exit(1);
}

// IndexNow accepts up to 10,000 URLs per request.
const urls = entries.map((e) => e.url);
for (let i = 0; i < urls.length; i += 10000) {
  if (!(await submit(urls.slice(i, i + 10000)))) process.exit(1);
}

if (!paths.length) {
  for (const e of entries) state[e.url] = e.lastmod;
  writeFileSync(STATE_FILE, `${JSON.stringify(state, null, 0)}\n`);
}

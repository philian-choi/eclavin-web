// Publish gate for `npm run deploy`: build, start the production build locally,
// run scripts/seo-check.mjs against it, and stop. A failing check stops the
// deploy before anything reaches www.eclavin.com.
//
// Emergency bypass: SEO_GATE_SKIP=1 npm run deploy

import { spawn, spawnSync } from 'node:child_process';

if (process.env.SEO_GATE_SKIP === '1') {
  console.log('SEO gate skipped (SEO_GATE_SKIP=1).');
  process.exit(0);
}

const PORT = 3999;
const run = (cmd, args) => spawnSync(cmd, args, { stdio: 'inherit', shell: process.platform === 'win32' });

if (run('npx', ['next', 'build']).status !== 0) process.exit(1);

const server = spawn('npx', ['next', 'start', '-p', String(PORT)], { stdio: 'ignore' });
const stop = () => server.kill('SIGTERM');
process.on('exit', stop);

let ready = false;
for (let i = 0; i < 60 && !ready; i++) {
  try {
    ready = (await fetch(`http://localhost:${PORT}/sitemap.xml`)).ok;
  } catch {}
  if (!ready) await new Promise((r) => setTimeout(r, 1000));
}
if (!ready) {
  console.error(`Local server on port ${PORT} did not start.`);
  process.exit(1);
}

const check = run('node', ['scripts/seo-check.mjs', `http://localhost:${PORT}`]);
stop();
process.exit(check.status ?? 1);

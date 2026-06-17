import { chromium } from 'playwright-core';

const [, , url, outPath, widthStr, heightStr] = process.argv;
const width = parseInt(widthStr || '1440', 10);
const height = parseInt(heightStr || '1400', 10);

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width, height } });
const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();
if (consoleErrors.length) {
  console.log('CONSOLE ERRORS:');
  for (const e of consoleErrors) console.log(' -', e);
} else {
  console.log('No console errors.');
}

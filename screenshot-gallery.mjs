import { chromium } from 'playwright-core';
const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', (err) => errors.push(String(err)));
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

const el = await page.locator('text=Sakienah, in elk detail').first();
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/gallery-top.png' });

await page.mouse.wheel(0, 800);
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/gallery-mid.png' });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
const el2 = await page.locator('text=Sakienah, in elk detail').first();
await el2.scrollIntoViewIfNeeded();
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/gallery-mobile.png' });

await browser.close();
console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'No console errors.');

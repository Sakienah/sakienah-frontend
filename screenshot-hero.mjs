import { chromium } from 'playwright-core';
const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3002/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.screenshot({ path: '/tmp/sakienah-hero-desktop.png' });
await page.setViewportSize({ width: 390, height: 1200 });
await page.waitForTimeout(500);
await page.screenshot({ path: '/tmp/sakienah-hero-mobile.png', fullPage: false });
await browser.close();

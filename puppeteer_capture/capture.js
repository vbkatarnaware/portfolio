const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, '../public/artifacts/qrapid/screenshots');

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  console.log('Navigating to login...');
  await page.goto('https://dashboard.qrapid.io', { waitUntil: 'networkidle2' });
  
  await delay(2000);
  
  // Capture Login
  fs.mkdirSync(path.join(OUT_DIR, '01-authentication'), { recursive: true });
  await page.screenshot({ path: path.join(OUT_DIR, '01-authentication/login-page.png') });
  console.log('Captured login.');

  console.log('Logging in...');
  try {
    await page.type('input[type="email"], input[name="email"]', 'cafecremenerul@gmail.com');
    await page.type('input[type="password"], input[name="password"]', 'ccn123@43');
    await page.click('button[type="submit"]');
  } catch (e) {
    console.log('Error typing credentials:', e.message);
  }

  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
  await delay(5000); 

  fs.mkdirSync(path.join(OUT_DIR, '02-dashboard'), { recursive: true });
  await page.screenshot({ path: path.join(OUT_DIR, '02-dashboard/dashboard.png') });
  console.log('Captured dashboard.');

  async function capturePage(hrefContains, dirName, fileName) {
    try {
      console.log(`Navigating to ${hrefContains}...`);
      // Since it might be hard to match by text, finding the a tag by href is more robust.
      // E.g., href="/inventory" or href="/expenses"
      const elements = await page.$$(`a[href*="${hrefContains}"]`);
      if (elements.length > 0) {
        await elements[0].click();
        await delay(4000); // Wait for page to load
        
        const dir = path.join(OUT_DIR, dirName);
        fs.mkdirSync(dir, { recursive: true });
        await page.screenshot({ path: path.join(dir, fileName) });
        console.log(`Captured ${fileName}.`);
      } else {
        console.log(`Could not find menu item for href ${hrefContains}`);
      }
    } catch (e) {
      console.log(`Error capturing ${hrefContains}:`, e.message);
    }
  }
  
  // Base on common SaaS dashboard routes
  await capturePage('inventory', '07-inventory', 'inventory.png');
  await capturePage('expense', '08-expenses', 'expenses.png');
  await capturePage('table', '05-table-management', 'table-overview.png'); 
  await capturePage('order', '03-order-management', 'order-main.png');
  await capturePage('menu', '04-menu-management', 'menu-management.png');
  await capturePage('report', '06-reports-analytics', 'reports.png');
  await capturePage('setting', '09-settings', 'settings.png');

  await browser.close();
  console.log('All done!');
}

run().catch(console.error);

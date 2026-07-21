const fs = require('fs');
const path = require('path');

const srcDir = '/Users/vipulkatarnaware/.gemini/antigravity-ide/brain/5f01196f-2ed3-43fd-ac84-51ff62bcc3c9';
const destDir = path.join(__dirname, 'public/artifacts/qrapid/screenshots');

const files = {
  'table_overview_1784459795478.png': '05-table-management/table-overview.png',
  'dashboard_page_1784459828005.png': '02-dashboard/dashboard.png',
  'inventory_list_page_1784459913252.png': '07-inventory/inventory.png',
  'expenses_page_1784459963849.png': '08-expenses/expenses.png'
};

for (const [srcName, destName] of Object.entries(files)) {
  const srcPath = path.join(srcDir, srcName);
  const destPath = path.join(destDir, destName);
  
  if (fs.existsSync(srcPath)) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${srcName} to ${destName}`);
  } else {
    console.error(`File not found: ${srcPath}`);
  }
}
console.log('Copy complete!');

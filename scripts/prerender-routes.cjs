const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('[prerender-routes] dist/index.html not found! Aborting.');
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const routes = [
  'resume',
  'projects/dr-momenul-islam'
];

routes.forEach((route) => {
  const targetDir = path.join(distDir, route);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), indexHtml, 'utf8');
  fs.writeFileSync(path.join(distDir, `${route}.html`), indexHtml, 'utf8');
  console.log(`[prerender-routes] Generated static route: /${route}`);
});

console.log('[prerender-routes] All client routes pre-rendered successfully.');

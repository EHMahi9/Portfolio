const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('[prerender-routes] dist/index.html not found! Aborting.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const routeMetadata = {
  'resume': {
    title: 'Resume | Ebnul Hasan Mahi - Full-Stack Developer',
    canonical: 'https://www.ebnulhasanmahi.me/resume',
    description: 'Technical resume and engineering background of Ebnul Hasan Mahi, Full-Stack Developer and Software Engineering student.',
    ogTitle: 'Resume | Ebnul Hasan Mahi - Full-Stack Developer',
    ogDescription: 'Technical resume and engineering background of Ebnul Hasan Mahi, Full-Stack Developer and Software Engineering student.',
    ogUrl: 'https://www.ebnulhasanmahi.me/resume'
  },
  'projects/dr-momenul-islam': {
    title: 'Case Study: Dr. Md. Momenul Islam Health Assistant | Ebnul Hasan Mahi',
    canonical: 'https://www.ebnulhasanmahi.me/projects/dr-momenul-islam',
    description: 'Engineering case study of an evidence-grounded health information assistant with multilingual semantic retrieval and deterministic safety triage.',
    ogTitle: 'Case Study: Dr. Md. Momenul Islam Health Assistant',
    ogDescription: 'Evidence-grounded health information assistant case study with multilingual retrieval and deterministic safety triage.',
    ogUrl: 'https://www.ebnulhasanmahi.me/projects/dr-momenul-islam'
  }
};

function injectMetadata(html, meta) {
  let updated = html;

  // Replace <title>
  updated = updated.replace(/<title>.*?<\/title>/s, `<title>${meta.title}</title>`);

  // Replace canonical
  updated = updated.replace(/<link rel="canonical" href=".*?"/s, `<link rel="canonical" href="${meta.canonical}"`);

  // Replace description
  updated = updated.replace(/<meta name="description" content=".*?"/s, `<meta name="description" content="${meta.description}"`);

  // Replace og:title
  updated = updated.replace(/<meta property="og:title" content=".*?"/s, `<meta property="og:title" content="${meta.ogTitle}"`);

  // Replace og:description
  updated = updated.replace(/<meta property="og:description" content=".*?"/s, `<meta property="og:description" content="${meta.ogDescription}"`);

  // Replace og:url
  updated = updated.replace(/<meta property="og:url" content=".*?"/s, `<meta property="og:url" content="${meta.ogUrl}"`);

  // Replace twitter:title
  updated = updated.replace(/<meta name="twitter:title" content=".*?"/s, `<meta name="twitter:title" content="${meta.ogTitle}"`);

  // Replace twitter:description
  updated = updated.replace(/<meta name="twitter:description" content=".*?"/s, `<meta name="twitter:description" content="${meta.ogDescription}"`);

  return updated;
}

Object.entries(routeMetadata).forEach(([route, meta]) => {
  const targetDir = path.join(distDir, route);
  fs.mkdirSync(targetDir, { recursive: true });
  const customizedHtml = injectMetadata(baseHtml, meta);
  fs.writeFileSync(path.join(targetDir, 'index.html'), customizedHtml, 'utf8');
  fs.writeFileSync(path.join(distDir, `${route}.html`), customizedHtml, 'utf8');
  console.log(`[prerender-routes] Generated static route with custom metadata: /${route}`);
});

console.log('[prerender-routes] All client routes pre-rendered with customized SEO metadata.');

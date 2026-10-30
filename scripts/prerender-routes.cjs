const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const ssrBundlePath = path.resolve(__dirname, '../dist-ssr/entry-server.mjs');

async function prerender() {
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('[prerender-routes] dist/index.html not found! Aborting.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  if (!fs.existsSync(ssrBundlePath)) {
    console.error('[prerender-routes] dist-ssr/entry-server.mjs not found! Run SSR build first.');
    process.exit(1);
  }

  // Import SSR bundle compiled directly from React component source files
  const ssr = await import(`file://${ssrBundlePath.replace(/\\/g, '/')}`);
  const caseStudyHtmlContent = ssr.renderCaseStudy();
  const resumeHtmlContent = ssr.renderResume();

  console.log('[prerender-routes] Rendered CaseStudyPage from single source of truth (Length: ' + caseStudyHtmlContent.length + ' chars)');
  console.log('[prerender-routes] Rendered ResumePage from single source of truth (Length: ' + resumeHtmlContent.length + ' chars)');

  const routeMetadata = {
    'resume': {
      title: 'Resume | Ebnul Hasan Mahi - Full-Stack Developer',
      canonical: 'https://www.ebnulhasanmahi.me/resume',
      description: 'Technical resume and engineering background of Ebnul Hasan Mahi, Full-Stack Developer and Software Engineering student.',
      ogTitle: 'Resume | Ebnul Hasan Mahi - Full-Stack Developer',
      ogDescription: 'Technical resume and engineering background of Ebnul Hasan Mahi, Full-Stack Developer and Software Engineering student.',
      ogUrl: 'https://www.ebnulhasanmahi.me/resume',
      content: resumeHtmlContent
    },
    'projects/dr-momenul-islam': {
      title: 'Case Study: Dr. Md. Momenul Islam Health Assistant | Ebnul Hasan Mahi',
      canonical: 'https://www.ebnulhasanmahi.me/projects/dr-momenul-islam',
      description: 'In-depth engineering case study of an evidence-grounded health assistant prototype using NHS clinical guidance, multilingual semantic retrieval, and deterministic safety triage.',
      ogTitle: 'Case Study: Dr. Md. Momenul Islam Health Assistant',
      ogDescription: 'In-depth engineering case study of an evidence-grounded health assistant prototype using NHS clinical guidance, multilingual semantic retrieval, and deterministic safety triage.',
      ogUrl: 'https://www.ebnulhasanmahi.me/projects/dr-momenul-islam',
      content: caseStudyHtmlContent
    }
  };

  function injectRoute(html, meta) {
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

    // Inject into BOTH real DOM root (<div id="root">) AND <noscript>
    if (meta.content) {
      updated = updated.replace(/<div id="root"><\/div>/s, `<div id="root">${meta.content}</div>`);
      updated = updated.replace(/<noscript>.*?<\/noscript>/s, `<noscript>${meta.content}</noscript>`);
    }

    return updated;
  }

  Object.entries(routeMetadata).forEach(([route, meta]) => {
    const targetDir = path.join(distDir, route);
    fs.mkdirSync(targetDir, { recursive: true });
    const customizedHtml = injectRoute(baseHtml, meta);
    fs.writeFileSync(path.join(targetDir, 'index.html'), customizedHtml, 'utf8');
    fs.writeFileSync(path.join(distDir, `${route.replace('/', '-')}.html`), customizedHtml, 'utf8');
    console.log(`[prerender-routes] Generated static route with full DOM content: /${route}`);
  });

  // Clean up dist-ssr after prerender
  try {
    const distSsrDir = path.resolve(__dirname, '../dist-ssr');
    if (fs.existsSync(distSsrDir)) {
      fs.rmSync(distSsrDir, { recursive: true, force: true });
      console.log('[prerender-routes] Cleaned temporary dist-ssr directory.');
    }
  } catch (err) {
    // Ignore cleanup error if file locked
  }

  console.log('[prerender-routes] All client routes pre-rendered with customized SEO metadata and full DOM HTML.');
}

prerender().catch((err) => {
  console.error('[prerender-routes] Error during prerender:', err);
  process.exit(1);
});

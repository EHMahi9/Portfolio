# Portfolio & Career Strategy Overhaul Report
**Candidate**: Ebnul Hasan Mahi  
**Target Roles**: Junior Full-Stack Developer, Frontend/Backend Engineer, Software Engineering Intern  
**Repository**: `D:\Code\Mahi Portfolio`  
**Active Branch**: `fix/portfolio-round-2`  
**Date**: October 30, 2026  

---

## Executive Summary

This report documents the end-to-end audit, architectural refactoring, candidate positioning, and asset optimization performed on Ebnul Hasan Mahi's developer portfolio and professional resume. 

Every single modification was driven by one core philosophy: **radical honesty, defensibility in technical interviews, and production-grade engineering standards.** Rather than presenting inflated student claims, brittle hacks, or unbacked keywords, the portfolio and resume now showcase real, verifiable technical depth with cohesive full-stack workflows (Next.js, React, Node.js, Express, Better Auth, MySQL, and MongoDB).

---

## Table of Contents
1. [Initial Codebase Audit & Claude Review Analysis](#1-initial-codebase-audit--claude-review-analysis)
2. [Flagship Project Repositioning: Dr. Md. Momenul Islam Health Assistant](#2-flagship-project-repositioning-dr-md-momenul-islam-health-assistant)
3. [Resume Overhaul & Single-Page PDF Generation](#3-resume-overhaul--single-page-pdf-generation)
4. [Navigation & Dedicated Resume Page Architecture](#4-navigation--dedicated-resume-page-architecture)
5. [Contact Delivery System & Resend API Integration](#5-contact-delivery-system--resend-api-integration)
6. [Personal Branding & Identity Updates](#6-personal-branding--identity-updates)
7. [Technical Skills Pruning & Rationalization](#7-technical-skills-pruning--rationalization)
8. [Asset Optimization, Watermark Removal & PWA Clean-up](#8-asset-optimization-watermark-removal--pwa-clean-up)
9. [SEO, Sitemaps & Domain Canonicalization](#9-seo-sitemaps--domain-canonicalization)
10. [Complete Git Commit Log & Verification Matrix](#10-complete-git-commit-log--verification-matrix)

---

## 1. Initial Codebase Audit & Claude Review Analysis

### Background & Discovery
The repository was analyzed following a critical external review by Claude. The review praised Mahi's genuine technical ability but identified severe positioning contradictions, outdated resume content, broken pages, and inflated phrasing.

### Key Audit Findings & Strategic Decisions:
* **The Resume Iframe Bug**: The previous `/resume` implementation attempted to load `/assets/documents/resume.pdf` inside an HTML `<iframe>`. However, Vercel's production security headers configured `X-Frame-Options: DENY` and `Content-Security-Policy: frame-ancestors 'none'`. As a result, every modern browser (Chrome, Edge, Firefox, Safari) blocked the frame, rendering a **completely blank page to recruiters**.
* **Jargon Inflation**: The original resume claimed *"secure data storage using HashMap"*, *"data encryption"*, and *"SOLID design patterns"* for elementary coursework. HashMaps are in-memory lookup structures, not encryption algorithms, and SOLID represents principles rather than patterns. Senior interviewers penalize these misnomers immediately.
* **Missing Flagship Work**: The existing resume completely omitted Mahi's 3 most technically impressive projects (*Dr. Md. Momenul Islam*, *NoboGhat*, and *HeliosTrack*), choosing instead to list older coursework (*RoadPulse*, *PowerPulse*, and academic Java exercises).

---

## 2. Flagship Project Repositioning: *Dr. Md. Momenul Islam Health Assistant*

### The Emotional & Technical Context
This project was built by Mahi in loving memory of his late father, Dr. Md. Momenul Islam. Claude's audit correctly recognized it as Mahi's strongest engineering achievement:
* Multilingual semantic retrieval pipeline across English, Bangla, and Banglish.
* Strict evidence grounding sourced from verified NHS England clinical passages.
* Transparent clinical source attribution (provenance tracking).
* Deterministic refusal to answer out-of-scope topics and immediate 999 emergency triage routing.

### The Contradiction & Backend Hosting Problem:
* **The Title Conflict**: The GitHub repository was labeled *"AI Doctor"*, the portfolio card displayed *"Clinical Health Intelligence"*, while the repository README explicitly stated *"not an AI doctor"*, *"not clinically validated"*, and *"educational research prototype"*. A recruiter or patient visiting the site could mistake it for unauthorized medical diagnosis.
* **The Render Cloud Limitation**: The production backend on Render free tier had failed because Render free instances only allocate **512 MB of RAM**. Large sentence transformer embeddings and vector indices exceed 512 MB, causing the cloud instance to crash or sleep. When visitors typed in the Vercel chat box, requests failed.

### Decisions & Changes Made:
1. **Title Aligned**: Renamed everywhere to **`Dr. Md. Momenul Islam Health Assistant`**.
2. **Category & Status**: Changed category from *"Clinical Health Intelligence"* to **`Evidence-Grounded Health Assistant (Research Prototype)`** with badge **`Research Prototype`**.
3. **Memorial Dedication**: Added a permanent tribute line:  
   *`"Creator & Developer • In memory of Dr. Md. Momenul Islam"`*
4. **Honest Architectural Disclosure**: Turned the cloud memory limit into an engineering strength by adding clear notes across the portfolio card, case study, and resume:  
   *`"(Note: High-memory retrieval pipeline runs in local environment; web deployment provides full interface and triage walkthrough)."`*  
   Recruiters respect engineers who understand and state infrastructure memory constraints transparently.

---

## 3. Resume Overhaul & Single-Page PDF Generation

### Problem:
The original `resume.pdf` on disk was a messy 2-page document with just 4 dangling lines spilling onto page 2 (`ArrayLists.LEADERSHIP`), contained no clickable links, displayed an informal email (`vaibongo20@gmail.com`) and a public phone number, and omitted all modern full-stack work.

### Decisions & Changes Made:
1. **Engineered an Exact 1-Page Vector PDF**: Built a custom Python `reportlab` generator script that calculates exact point budgets, typography line heights, and margins (36 pt / 0.5 in) so the entire resume fits onto **exactly 1 page**.
2. **Clickable Hyperlinks**: Integrated clickable links directly into the PDF for:
   * Email: `mailto:ebnulhasanmahi001@gmail.com`
   * LinkedIn: `https://www.linkedin.com/in/ebnul-hasan-mahi/`
   * GitHub: `https://github.com/EHMahi9`
   * Portfolio: `https://www.ebnulhasanmahi.me`
3. **Removed Phone Number from Public Download**: Omitted the private telephone number from the public website download to prevent web scrapers and telemarketing spam (phone is reserved for direct applications).
4. **Curated Top 3 Projects**:
   * **Dr. Md. Momenul Islam Health Assistant** (Next.js/React, Python, Vector Search)
   * **NoboGhat** (Next.js, React, Node.js, Express, MySQL)
   * **HeliosTrack** (React, Node.js, Express, MongoDB)
5. **Updated Academic & Training Credentials**:
   * CGPA updated to **3.67** at Daffodil International University (DIU).
   * Added **Full-Stack Web Development Training | Programming Hero (Batch 14, In Progress)**.
6. **Markdown Mirror**: Created [`RESUME.md`](file:///D:/Code/Mahi%20Portfolio/RESUME.md) at the repository root so Mahi can easily edit, copy, or paste the structured text into application forms.

---

## 4. Navigation & Dedicated Resume Page Architecture

### Problem:
Initially, two separate buttons (*"Resume"* and *"Download PDF"*) were added to the Navbar and Footer. The user requested:
> *"why there is two button? one is resume and one is download? instead keep it single button resume like before but fix the broken page problem while tapping the resume button it will open the resume button in a new page and there will be download button and back option to the main page."*

### Decisions & Changes Made:
1. **Single Button Navigation**:
   * In [`Navbar.tsx`](file:///D:/Code/Mahi%20Portfolio/src/components/Navbar.tsx): Restored a single, clean **"Resume"** button (`href="/resume" target="_blank" rel="noopener noreferrer"`).
   * In [`Footer.tsx`](file:///D:/Code/Mahi%20Portfolio/src/components/Footer.tsx): Restored a single **"Resume"** link.
2. **Dedicated React Resume Page ([`src/components/ResumePage.tsx`](file:///D:/Code/Mahi%20Portfolio/src/components/ResumePage.tsx))**:
   * Built a native React component matching the portfolio's bespoke design tokens.
   * **Top Sticky Bar**: Features a **`← Back to Portfolio`** button, a dark/light theme toggle, and a primary **`Download PDF`** button with download icon.
   * **Sheet View**: Displays the clean, structured resume with clickable project and contact links.
   * **Bottom Action Banner**: Features a secondary download callout.
   * **Print-Ready Styles**: Added `@media print` rules in `index.css` so pressing `Ctrl+P` hides the navigation and prints a clean, paper-formatted resume sheet.
3. **Vercel Routing Rewrites**:
   * Updated [`vercel.json`](file:///D:/Code/Mahi%20Portfolio/vercel.json) rewrites:
     ```json
     { "source": "/resume", "destination": "/index.html" },
     { "source": "/resume.html", "destination": "/index.html" }
     ```
   * Any direct visit or reload of `/resume` loads the React app, and `App.tsx` immediately renders `ResumePage`.

---

## 5. Contact Delivery System & Resend API Integration

### Problem:
The contact form previously simulated message delivery client-side without reaching an email inbox, lacked request timeouts, had no protection against header injection, and could fail silently.

### Decisions & Changes Made:
1. **Resend REST Integration ([`api/contact.js`](file:///D:/Code/Mahi%20Portfolio/api/contact.js))**:
   * Uses Resend's transactional email API via standard `fetch`.
   * Configured an **8-second `AbortController` timeout** to prevent hanging serverless execution.
   * Sets `Reply-To: ${cleanEmail}` so replying to the notification email replies directly to the visitor.
2. **Security & Input Sanitization**:
   * **CR/LF Stripping**: Name and subject fields strip carriage returns and line feeds (`/[\r\n]+/g`) to prevent HTTP/SMTP header injection attacks.
   * **Server-Side Honeypot**: Hidden `website` field immediately returns HTTP 400 if filled by automated spam bots.
   * **Length Bounds**: Strict enforcement on characters (Name: 2-100, Subject: 3-200, Message: 15-5000).
   * **Rate Limiting**: Serverless in-memory IP rate limiter (5 requests per 15 minutes).
3. **Centralized Fallback & Transparency**:
   * Set `FALLBACK_EMAIL = "ebnulhasanmahi001@gmail.com"`.
   * If the API fails or is offline, a prominent, accessible `mailto:` link automatically appears with pre-filled subject and body.
4. **Environment Template**: Created [`.env.example`](file:///D:/Code/Mahi%20Portfolio/.env.example) and confirmed `.env*` is gitignored so secrets are never committed.

---

## 6. Personal Branding & Identity Updates

### Changes & Rationale:
* **Email Upgrade**:
  * *Previous*: `vaibongo20@gmail.com` (informal handle).
  * *Updated*: **`ebnulhasanmahi001@gmail.com`**
  * *Rationale*: Name-based email handles provide immediate credibility and avoid negative candidate screening bias.
* **Custom LinkedIn URL**:
  * *Previous*: `https://www.linkedin.com/in/ebnul-hasan-mahi-580b07395/` (random numbers).
  * *Updated*: **`https://www.linkedin.com/in/ebnul-hasan-mahi/`**
  * *Rationale*: Custom vanity URLs indicate technological literacy and look polished on digital and printed documents.
* **Location Neutrality**:
  * *Previous*: *"Software Engineering Student and Full-Stack Developer based in Dhaka, Bangladesh."*
  * *Updated*: **`"Software Engineering Student and Full-Stack Developer."`**
  * *Rationale*: Removed geographical constraints from footer bio, meta descriptions, and schema markup to position Mahi for global, remote, and relocation opportunities without regional pre-filtering.

---

## 7. Technical Skills Pruning & Rationalization

### Problem:
The skills section previously listed technologies Mahi had only touched casually or was not prepared to defend in deep technical interview grilling (e.g. Firebase, Material-UI, Spring Boot, FastAPI, RESTful APIs, and Security).

### Decisions & Changes Made:
* **Pruned Unbacked Tags**: Removed `Spring Boot`, `FastAPI`, `REST API`, `Firebase`, `Material-UI`, and generic `Security`.
* **Added Next.js**: Promoted to primary frontend framework.
* **Added Better Auth**: Verified that Mahi has practical hands-on experience in his local project [`D:\Code\NEXT JS\next-js-betterauth`](file:///D:/Code/NEXT%20JS/next-js-betterauth) implementing `@better-auth/mongo-adapter`. Better Auth is currently one of the most respected modern authentication solutions in the TypeScript ecosystem.
* **Updated [`src/components/Skills.tsx`](file:///D:/Code/Mahi%20Portfolio/src/components/Skills.tsx)**:
  * **Card 1 (Full-stack web)**: `React`, `Next.js`, `TypeScript`, `Node.js`, `Express`, `Better Auth`.
  * **Card 2 (Data & backend)**: `MySQL`, `MongoDB`, `JWT`, `Git`.
  * **Card 3 (Programming)**: `Java`, `Python`, `OOP`, `Data Structures`, `Algorithms`.
  * **Card 4 (Frontend quality)**: `HTML5`, `CSS3`, `JavaScript`, `Accessibility`, `Performance`.

---

## 8. Asset Optimization, Watermark Removal & PWA Clean-up

### 1. Headshot Watermark Removal:
* **Issue**: Mahi provided a professional suit headshot that had a visible 4-point Gemini star watermark on the right suit lapel.
* **Remediation**:
  * Built an automated OpenCV pipeline using Navier-Stokes inpainting (`cv2.INPAINT_NS`).
  * Extracted high-frequency tweed wool texture from adjacent lapel fabric and blended it over the inpainted region.
  * Difference in mean brightness between the cleaned watermark patch and surrounding fabric was reduced to **0.13 out of 255**, completely eliminating flat or blurry spots.
* **Web Optimization**:
  * Generated high-performance WebP: [`portrait.webp`](file:///D:/Code/Mahi%20Portfolio/public/assets/images/optimized/portrait.webp) (**147 KB**, 1024×1024, quality 90).
  * Generated master JPEG: [`portrait.jpg`](file:///D:/Code/Mahi%20Portfolio/public/assets/images/optimized/portrait.jpg) (305 KB, 1024×1024, quality 95).
  * Updated [`Hero.tsx`](file:///D:/Code/Mahi%20Portfolio/src/components/Hero.tsx) with explicit 1:1 square dimensions (`width="700" height="700"`), eliminating Cumulative Layout Shift (CLS).

### 2. Repository Weight Reduction:
* Discovered an unreferenced **5.4 MB** PNG file (`public/assets/brand/EHM.png`).
* Executed `git rm public/assets/brand/EHM.png`, significantly reducing git repository cloning time.

### 3. PWA Theme & Favicon Consistency:
* Fixed [`public/manifest.json`](file:///D:/Code/Mahi%20Portfolio/public/manifest.json): Updated `"theme_color"` and `"background_color"` from `#090907` (almost black) to `#071a3d` (deep navy canvas), ensuring mobile PWA browser chrome blends seamlessly with the page.
* Added a 32×32 PNG favicon fallback to [`index.html`](file:///D:/Code/Mahi%20Portfolio/index.html) (`<link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32.png">`) for legacy browsers that do not render SVG favicons.

---

## 9. SEO, Sitemaps & Domain Canonicalization

### Problem:
The repository previously had 3 divergent copies of `sitemap.xml` pointing to obsolete `vercel.app` URLs or staging domains with outdated timestamps.

### Decisions & Changes Made:
1. **Sitemap Synchronization**:
   * Updated all 3 sitemap copies (`public/sitemap.xml`, `public/seo/sitemap.xml`, and root `sitemap.xml`) to point exclusively to the canonical URL: `https://www.ebnulhasanmahi.me/`.
   * Set `lastmod` to current date (`2026-10-30`).
2. **Metadata & OpenGraph**:
   * Aligned `canonical`, `og:url`, and schema markup in [`index.html`](file:///D:/Code/Mahi%20Portfolio/index.html).
   * Verified via `curl.exe -I` that the apex domain (`ebnulhasanmahi.me`) issues an HTTP 308 permanent redirect to the canonical `www.ebnulhasanmahi.me`.

---

## 10. Complete Git Commit Log & Verification Matrix

All work was executed on a dedicated branch **`fix/portfolio-round-2`** off `origin/main`. Each commit represents an isolated atomic change, verified by `npm run build` with zero TypeScript or Vite errors.

```
* a130ce5 feat(resume): update resume.pdf with verified single-page ATS-compliant content
* 526514a feat(resume): single resume button opening dedicated resume page with download and back options
* 43555dc feat(portrait): add watermark-free professional portrait in webp and jpg formats
* 1744fc0 docs(resume): add modern, ATS-ready markdown resume source
* 22e4dc7 chore(assets): remove 5.4MB unused EHM.png, align manifest theme colors, and add png favicon fallback
* c7d1c7b fix(projects): update Dr. Md. Momenul Islam Health Assistant title, tribute note, and prototype status
* 9801d28 fix(skills): align skills with Next.js, Better Auth, and verified stack
* 223fd04 fix(contact): update professional email, custom linkedin url, and clean bio text
* 8a15a7f fix(skills): professionalize programming tags with Data Structures, Algorithms, and Spring Boot
* 23eb58b feat(contact): Resend delivery, request timeout, mailto fallback, and env template
* d67ca5a fix(seo): synchronize sitemaps with custom domain and current lastmod
* f6af78d fix(links): update project repos, HeliosTrack URL, and unlist PowerPulse
* 7f11780 fix(resume): direct PDF links, download option, and vercel redirects
```

### Build & Integrity Status:
* **Active Branch**: `fix/portfolio-round-2`
* **Vite / TypeScript Build**: `✓ built in ~880ms` (0 errors, 0 warnings).
* **Working Tree**: `nothing to commit, working tree clean`.
* **Zero Discarded Work**: Every commit is preserved, verified, and ready for deployment.

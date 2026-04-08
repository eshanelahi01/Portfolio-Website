# SEO Setup Guide

This project already ships the core SEO files in `public/` and the HTML metadata in the page entry files.

## 1. Google Search Console

### Recommended option: Domain property with DNS verification
1. Go to Google Search Console and click **Add property**.
2. Choose **Domain**.
3. Enter your root domain, for example `eshanelahi.netlify.app` or your custom domain.
4. Copy the TXT record Google gives you.
5. Add that TXT record in your DNS provider.
6. Wait for DNS propagation, then click **Verify** in Search Console.

### Alternate option: URL-prefix property with HTML tag verification
1. In Google Search Console click **Add property**.
2. Choose **URL prefix** and enter the exact deployed URL, for example `https://eshanelahi.netlify.app/`.
3. Select **HTML tag**.
4. Copy the verification tag and paste it inside the `<head>` of [index.html](./index.html).
5. Deploy the site, then return to Search Console and click **Verify**.

Example verification tag:

```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_TOKEN" />
```

## 2. Submit the sitemap
1. Open Google Search Console.
2. Go to **Indexing > Sitemaps**.
3. Submit:

```text
https://eshanelahi.netlify.app/sitemap.xml
```

## 3. Check indexing status
1. Use **URL Inspection** in Search Console to test a specific URL.
2. Use **Indexing > Pages** to review which URLs are indexed or excluded.
3. Re-run URL Inspection after major content updates or after publishing new project pages.

## 4. Where SEO files live
- `index.html`: homepage metadata, canonical, OG, Twitter, favicon links
- `projects/**/*.html`, `services/index.html`, `contact/index.html`: route-level metadata
- `public/sitemap.xml`: generated sitemap
- `public/robots.txt`: generated robots policy
- `public/indexnow-key.txt`: public IndexNow verification key file
- `public/preview.png`: default social preview image
- `public/favicon-32x32.png` and `public/apple-touch-icon.png`: favicon assets

## 5. Netlify deployment
- Optional environment variable:

```text
SITE_URL=https://eshanelahi.netlify.app
```

- Build command:

```text
npm run build
```

- Publish directory:

```text
dist
```

- Optional post-deploy IndexNow step:

```text
npm run indexnow
```

For Netlify, the safest approach is to run `npm run indexnow` from a post-deploy automation step or CI job after the new deploy is live.

## 6. Vercel deployment
- Optional environment variable:

```text
SITE_URL=https://eshanelahi.netlify.app
```

- Framework preset: `Vite`
- Build command:

```text
npm run build
```

- Output directory:

```text
dist
```

- Optional post-deploy IndexNow step:

```text
npm run indexnow
```

For Vercel, run the IndexNow step after production deployment completes, for example in CI or a deploy automation workflow.

## 7. Useful npm scripts
- `npm run generate:seo`: regenerate `robots.txt` and `sitemap.xml`
- `npm run build`: generate SEO assets and build the site
- `npm run indexnow`: ping IndexNow with the homepage, projects page, services page, contact page, and project URLs

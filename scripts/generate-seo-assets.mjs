import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects, siteConfig } from '../src/data/siteContent.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '../public')
const buildDate = new Date().toISOString().slice(0, 10)
const siteUrl = (process.env.SITE_URL || siteConfig.siteUrl).replace(/\/+$/, '')

const urls = [
  { loc: `${siteUrl}/`, changefreq: 'monthly', priority: '1.0' },
  { loc: `${siteUrl}/projects/`, changefreq: 'monthly', priority: '0.9' },
  { loc: `${siteUrl}/contact/`, changefreq: 'monthly', priority: '0.8' },
  { loc: `${siteUrl}/services/`, changefreq: 'monthly', priority: '0.8' },
  ...projects
    .filter((project) => project.caseStudy)
    .map((project) => ({
      loc: `${siteUrl}/projects/${project.slug}/`,
      changefreq: 'monthly',
      priority: '0.8',
    })),
]

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

await mkdir(publicDir, { recursive: true })
await writeFile(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8')
await writeFile(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8')

console.log(`Generated sitemap.xml and robots.txt for ${siteUrl}`)


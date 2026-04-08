import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { projects, siteConfig } from '../src/data/siteContent.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const keyFilePath = path.resolve(__dirname, '../public/indexnow-key.txt')
const siteUrl = (process.env.SITE_URL || siteConfig.siteUrl).replace(/\/+$/, '')
const keyLocation = `${siteUrl}/indexnow-key.txt`
const key = (process.env.INDEXNOW_KEY || (await readFile(keyFilePath, 'utf8'))).trim()

if (!key) {
  throw new Error('Missing IndexNow key. Add public/indexnow-key.txt or set INDEXNOW_KEY.')
}

const host = new URL(siteUrl).host
const urlList = [
  `${siteUrl}/`,
  `${siteUrl}/projects/`,
  `${siteUrl}/contact/`,
  `${siteUrl}/services/`,
  ...projects.filter((project) => project.caseStudy).map((project) => `${siteUrl}/projects/${project.slug}/`),
]

const payload = {
  host,
  key,
  keyLocation,
  urlList,
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  body: JSON.stringify(payload),
})

if (!response.ok && response.status !== 202) {
  const errorText = await response.text()
  throw new Error(`IndexNow submission failed with ${response.status}: ${errorText}`)
}

console.log(`IndexNow accepted ${urlList.length} URLs with status ${response.status}.`)
console.log(JSON.stringify(payload, null, 2))


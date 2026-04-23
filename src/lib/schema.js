import {
  featuredProjects,
  knowsAbout,
  projectFooterLinks,
  projects,
  serviceOffers,
  siteConfig,
} from '../data/siteContent'

function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path
  return `${siteConfig.siteUrl}${path}`
}

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    image: absoluteUrl(siteConfig.socialImage),
    email: siteConfig.email,
    jobTitle: siteConfig.fullRole,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: siteConfig.university,
    },
    worksFor: {
      '@type': 'Organization',
      name: siteConfig.company,
    },
    sameAs: [siteConfig.github, siteConfig.linkedin],
    knowsAbout,
    description: siteConfig.description,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'professional inquiries',
      email: siteConfig.email,
      url: absoluteUrl('/contact/'),
    },
  }
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
  }
}

export function getWebPageSchema({
  title,
  description,
  path = '/',
  type = 'WebPage',
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
    about: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    primaryImageOfPage: absoluteUrl(siteConfig.socialImage),
  }
}

export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  }
}

export function getItemListSchema({ name, path, items }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url: absoluteUrl(path),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title || item.name,
      url: absoluteUrl(item.caseStudy ? `/projects/${item.slug}/` : item.liveUrl || item.href || path),
    })),
  }
}

export function getHomeSchemas() {
  return [
    getPersonSchema(),
    getWebSiteSchema(),
    getWebPageSchema({
      title: `${siteConfig.name} | ${siteConfig.role}`,
      description: siteConfig.description,
      path: '/',
    }),
    getItemListSchema({
      name: 'Featured Projects',
      path: '/',
      items: featuredProjects,
    }),
  ]
}

export function getProjectsPageSchemas() {
  return [
    getWebSiteSchema(),
    getWebPageSchema({
      title: `Projects | ${siteConfig.name}`,
      description:
        'Case studies and project work from Eshan Elahi across full stack development, business websites, backend APIs, and AI-powered web applications.',
      path: '/projects/',
      type: 'CollectionPage',
    }),
    getItemListSchema({
      name: 'Project Collection',
      path: '/projects/',
      items: projects,
    }),
  ]
}

export function getServicesPageSchemas() {
  return [
    getWebSiteSchema(),
    getWebPageSchema({
      title: `Services | ${siteConfig.name}`,
      description:
        'Full stack MERN development services from Eshan Elahi including web apps, backend APIs, FastAPI services, and AI automation workflows.',
      path: '/services/',
    }),
    getItemListSchema({
      name: 'Service Offers',
      path: '/services/',
      items: serviceOffers,
    }),
  ]
}

export function getContactPageSchemas() {
  return [
    getPersonSchema(),
    getWebPageSchema({
      title: `Contact ${siteConfig.name}`,
      description:
        'Contact Eshan Elahi for full stack MERN roles, freelance projects, backend APIs, React development, and AI-powered web product work.',
      path: '/contact/',
      type: 'ContactPage',
    }),
  ]
}

export function getProjectPageSchemas(project) {
  return [
    getWebSiteSchema(),
    getWebPageSchema({
      title: `${project.title} | ${siteConfig.name}`,
      description: project.summary,
      path: `/projects/${project.slug}/`,
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: project.title,
      description: project.summary,
      url: absoluteUrl(`/projects/${project.slug}/`),
      image: absoluteUrl(project.socialImage || siteConfig.socialImage),
      creator: {
        '@type': 'Person',
        name: siteConfig.name,
        url: siteConfig.siteUrl,
      },
      keywords: project.keywords,
      genre: project.category,
      about: project.stack,
      sameAs: project.liveUrl ? [project.liveUrl] : undefined,
    },
  ]
}

export function getFooterProjectSchemas() {
  return getItemListSchema({
    name: 'Footer Project Links',
    path: '/',
    items: projectFooterLinks,
  })
}

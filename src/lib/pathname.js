export function normalizePath(pathname = '/') {
  const withoutIndex = pathname.replace(/index\.html$/i, '')
  const normalized = withoutIndex.replace(/\/{2,}/g, '/')

  if (!normalized || normalized === '') {
    return '/'
  }

  return normalized.endsWith('/') ? normalized : `${normalized}/`
}

export function isHomePath(pathname = '/') {
  return normalizePath(pathname) === '/'
}


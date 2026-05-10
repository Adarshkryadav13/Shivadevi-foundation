const trimEndSlash = (value) =>
  typeof value === 'string' ? value.replace(/\/+$/, '') : ''

/** Main public site (cPanel: https://shivadevifoundation.org) */
export const SITE_URL =
  trimEndSlash(import.meta.env.VITE_SITE_URL) ||
  'https://shivadevifoundation.org'

const DEV_API = 'http://localhost:5001/api'

/**
 * API base for axios + fetch.
 * Set VITE_API_URL at build time, e.g. https://shivadevifoundation.org/api (reverse proxy)
 * or https://your-backend.onrender.com/api
 */
export function getApiBase() {
  const fromEnv = trimEndSlash(import.meta.env.VITE_API_URL)
  if (fromEnv) return fromEnv
  if (import.meta.env.PROD) return `${SITE_URL}/api`
  return DEV_API
}

/** Origin for legacy relative paths like /uploads/... */
export function getMediaBase() {
  const api = getApiBase()
  if (api.startsWith('http')) {
    const withoutApi = api.replace(/\/api\/?$/, '')
    return withoutApi || SITE_URL
  }
  return 'http://localhost:5001'
}

export function resolveMediaUrl(url) {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${getMediaBase()}${url.startsWith('/') ? '' : '/'}${url}`
}

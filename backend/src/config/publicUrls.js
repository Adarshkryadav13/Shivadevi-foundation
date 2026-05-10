/** Live website (cPanel / main domain). Override with FRONTEND_URL in env. */
export const DEFAULT_FRONTEND_URL = 'https://shivadevifoundation.org'

export function getFrontendUrl() {
  const raw = process.env.FRONTEND_URL?.trim() || DEFAULT_FRONTEND_URL
  return raw.replace(/\/+$/, '')
}

/** Browser origins allowed for credentialed CORS. Extend with CORS_ORIGINS (comma-separated). */
export function getCorsAllowedOrigins() {
  const bases = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    DEFAULT_FRONTEND_URL,
    'https://www.shivadevifoundation.org',
  ]
  const extra = process.env.CORS_ORIGINS?.trim()
  if (!extra) return bases
  const more = extra.split(',').map((s) => s.trim()).filter(Boolean)
  return [...new Set([...bases, ...more])]
}

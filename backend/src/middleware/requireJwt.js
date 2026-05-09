import jwt from 'jsonwebtoken'

const parsePublicPaths = () => {
  const raw = process.env.API_PUBLIC_PATHS
  if (!raw) return []
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export const requireJwt = (req, res, next) => {
  // CORS preflight requests should not be blocked by auth.
  if (req.method === 'OPTIONS') return next()

  const publicApiPaths = parsePublicPaths()
  const isPublicPath = publicApiPaths.some((path) => req.path === path || req.path.startsWith(`${path}/`))
  if (isPublicPath) return next()

  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''

  if (!token) return res.status(401).json({ error: 'Unauthorized: missing token' })

  try {
    req.auth = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret')
    return next()
  } catch {
    return res.status(401).json({ error: 'Unauthorized: invalid or expired token' })
  }
}


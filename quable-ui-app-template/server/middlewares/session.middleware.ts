import { Request, Response, NextFunction } from 'express'
import { generateNewAuthToken, verifyAuthToken } from '../helpers/auth.js'

// Routes that don't require the standard session authentication
// These are Quable lifecycle endpoints that have their own authentication mechanism
const EXCLUDED_ROUTES = ['/permission', '/install']

export function sessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Skip session middleware for Quable lifecycle endpoints
  if (EXCLUDED_ROUTES.includes(req.path)) {
    return next()
  }

  // For POST / with slot parameter, skip session middleware (Quable slot interaction)
  if (req.method === 'POST' && req.path === '/' && req.query.slot) {
    return next()
  }

  // For POST / without slot (configuration page), skip session middleware
  if (req.method === 'POST' && req.path === '/' && !req.query.slot) {
    return next()
  }

  const authToken = req.cookies?.['x-quable-auth-token']

  if (authToken) {
    try {
      verifyAuthToken(authToken)
      return next()
    } catch (error) {
      console.warn('Auth token verification failed:', error)
    }
  }

  if (Object.keys(req.query).length > 0) {
    try {
      const newAuthToken = generateNewAuthToken(req.query)
      res.cookie('x-quable-auth-token', newAuthToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      })
      return next()
    } catch (error) {
      console.error('Failed to generate auth token:', error)
      return res.status(401).send({ message: 'Authentication failed' })
    }
  }

  return next()
}

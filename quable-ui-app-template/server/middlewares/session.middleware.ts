import { Request, Response, NextFunction } from 'express'
import { generateNewAuthToken, verifyAuthToken } from '../helpers/auth.js'

export function sessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
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

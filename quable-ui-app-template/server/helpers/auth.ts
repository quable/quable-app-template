import jwt from 'jsonwebtoken'
import { ParsedQs } from 'qs'

export interface SessionData {
  quableInstanceName: string
  dataLocale: string
  interfaceLocale: string
  userId: string
}

const jwtSecret = process.env.QUABLE_PARTNER_API_SECRET || 'DEFAULT_SECRET'

export function generateAuthToken(sessionData: SessionData): string {
  return jwt.sign(sessionData, jwtSecret, { expiresIn: '24h' })
}

export const verifyAuthToken = (authToken: string) =>
  jwt.verify(authToken, jwtSecret)

export function generateNewAuthToken(query: ParsedQs): string {
  const { quableInstanceName, dataLocale, interfaceLocale, userId } = query

  if (!quableInstanceName || !dataLocale || !interfaceLocale || !userId) {
    throw new Error('Missing required query parameters for token generation')
  }

  const sessionData: SessionData = {
    quableInstanceName: quableInstanceName as string,
    dataLocale: dataLocale as string,
    interfaceLocale: interfaceLocale as string,
    userId: userId as string,
  }

  return generateAuthToken(sessionData)
}

export function handleTokenError(error: Error, authToken: string) {
  if (error.name !== 'TokenExpiredError' || !authToken) {
    throw error
  }

  const { quableInstanceName, dataLocale, interfaceLocale, userId } =
    jwt.decode(authToken) as SessionData

  return generateAuthToken({
    quableInstanceName,
    dataLocale,
    interfaceLocale,
    userId,
  })
}

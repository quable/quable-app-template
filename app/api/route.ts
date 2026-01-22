import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api - Configuration page (redirects to /quable-config)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const queryString = searchParams.toString()

  // Redirect to the config page with the same query params
  const redirectUrl = `/quable-config${queryString ? `?${queryString}` : ''}`
  return NextResponse.redirect(new URL(redirectUrl, request.url))
}

// POST /api?slot=x - Slot interaction
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const slot = searchParams.get('slot')

  if (!slot) {
    return NextResponse.json({ error: 'Slot parameter is required' }, { status: 400 })
  }

  const body = await request.json()
  const { instance, user, object, locale } = body

  console.log('Slot interaction request received:', {
    slot,
    body,
  })

  // Store the session in database
  const session = await prisma.slotSession.create({
    data: {
      slot,
      instanceName: instance?.name,
      instanceUrl: instance?.url,
      userEmail: user?.email,
      userAdmin: user?.admin ?? false,
      objectType: object?.type,
      objectIds: object?.ids?.join(','),
      dataLocale: locale?.data,
      interfaceLocale: locale?.interface,
    },
  })

  console.log('Slot session created:', session.id)

  // Build the base URL for the app
  const appUrl = process.env.QUABLE_APP_HOST_URL || 'http://localhost:4000'

  // Return URL with session ID - redirect to React page
  const url = `${appUrl}/session/${session.id}`

  console.log('Generated slot interaction URL:', url)

  return NextResponse.json({ url })
}

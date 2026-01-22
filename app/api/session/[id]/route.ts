import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const session = await prisma.slotSession.findUnique({
    where: { id },
  })

  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  return NextResponse.json({
    id: session.id,
    slot: session.slot,
    instance: {
      name: session.instanceName,
      url: session.instanceUrl,
    },
    user: {
      email: session.userEmail,
      admin: session.userAdmin,
    },
    object: {
      type: session.objectType,
      ids: session.objectIds?.split(',') ?? [],
    },
    locale: {
      data: session.dataLocale,
      interface: session.interfaceLocale,
    },
    createdAt: session.createdAt,
  })
}

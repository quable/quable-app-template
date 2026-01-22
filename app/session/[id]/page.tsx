import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { SingleActionPage } from '@/components/session/SingleActionPage'
import { BulkActionPage } from '@/components/session/BulkActionPage'
import { PageTabPage } from '@/components/session/PageTabPage'
import { DefaultSessionPage } from '@/components/session/DefaultSessionPage'

interface PageProps {
  params: Promise<{ id: string }>
}

async function getSession(id: string) {
  const session = await prisma.slotSession.findUnique({
    where: { id },
  })

  if (!session) {
    return null
  }

  return {
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
      ids: session.objectIds?.split(',').filter(Boolean) ?? [],
    },
    locale: {
      data: session.dataLocale,
      interface: session.interfaceLocale,
    },
    createdAt: session.createdAt.toISOString(),
  }
}

export default async function SessionPage({ params }: PageProps) {
  const { id } = await params
  const session = await getSession(id)

  if (!session) {
    notFound()
  }

  switch (session.slot) {
    case 'document.action.single':
      return <SingleActionPage session={session} />
    case 'document.action.bulk':
      return <BulkActionPage session={session} />
    case 'document.page.tab':
      return <PageTabPage session={session} />
    default:
      return <DefaultSessionPage session={session} />
  }
}

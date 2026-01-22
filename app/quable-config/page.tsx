import { ConfigurationPage } from '@/components/session/ConfigurationPage'

interface PageProps {
  searchParams: Promise<{
    applicationType?: string
    quableInstanceName?: string
    interfaceLocale?: string
    dataLocale?: string
    userId?: string
  }>
}

export default async function QuableConfigPage({ searchParams }: PageProps) {
  const params = await searchParams

  console.log('Configuration page request received:', params)

  return (
    <ConfigurationPage
      applicationType={params.applicationType}
      quableInstanceName={params.quableInstanceName}
      interfaceLocale={params.interfaceLocale}
      dataLocale={params.dataLocale}
      userId={params.userId}
    />
  )
}

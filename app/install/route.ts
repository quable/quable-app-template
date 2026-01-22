import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const quableInstanceName = searchParams.get('quableInstanceName')
  const interfaceLocale = searchParams.get('interfaceLocale')
  const dataLocale = searchParams.get('dataLocale')

  console.log('Installation request received:', {
    quableInstanceName,
    interfaceLocale,
    dataLocale,
  })

  // TODO: Implement your installation logic here
  // Examples:
  // - Store the instance credentials in your database
  // - Register webhooks with the Quable API
  // - Create custom attributes if needed

  return NextResponse.json({
    statusCode: 200,
    message: 'App installed successfully',
    data: {
      quableInstanceName,
      interfaceLocale,
      dataLocale,
    },
  })
}

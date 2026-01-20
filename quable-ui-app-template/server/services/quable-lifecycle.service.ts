import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

interface InstallationParams {
  quableInstanceName: string
  interfaceLocale: string
  dataLocale: string
}

interface SlotInteractionParams {
  slot: string
  instance?: {
    name?: string
    url?: string
  }
  user?: {
    email: string
    admin: boolean
  }
  object?: {
    type: string
    ids: string[]
  }
  locale?: {
    data: string
    interface: string
  }
}

interface SlotResponse {
  url: string
}

class QuableLifecycleService {
  /**
   * Handle app installation
   * This is where you would:
   * - Store instance credentials
   * - Create webhooks
   * - Add custom attributes
   */
  public async handleInstallation(params: InstallationParams) {
    const { quableInstanceName, interfaceLocale, dataLocale } = params

    console.log('Processing installation for instance:', quableInstanceName)

    // TODO: Implement your installation logic here
    // Examples:
    // - Store the instance credentials in your database
    // - Register webhooks with the Quable API
    // - Create custom attributes if needed

    return {
      statusCode: 200,
      message: 'App installed successfully',
      data: {
        quableInstanceName,
        interfaceLocale,
        dataLocale,
      },
    }
  }

  /**
   * Get the configuration page HTML
   * This HTML will be displayed in an iframe within the Quable PIM
   */
  public async getConfigurationPage(_body: unknown) {
    // Generate a session ID for this configuration session
    const sessionId = uuidv4()

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quable App Configuration</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 40px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }
    h1 {
      color: #333;
      margin-bottom: 10px;
      font-size: 24px;
    }
    p {
      color: #666;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    .status {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px;
      background: #e8f5e9;
      border-radius: 8px;
      color: #2e7d32;
    }
    .status-icon {
      font-size: 20px;
    }
    .session-info {
      margin-top: 20px;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 8px;
      font-size: 14px;
      color: #666;
    }
    .session-info code {
      background: #e0e0e0;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Quable App Configuration</h1>
    <p>Your Quable App is successfully configured and ready to use.</p>
    <div class="status">
      <span class="status-icon">✓</span>
      <span>Application is active</span>
    </div>
    <div class="session-info">
      <strong>Session ID:</strong> <code>${sessionId}</code>
    </div>
  </div>
</body>
</html>
    `.trim()

    return { html }
  }

  /**
   * Handle slot interaction
   * Stores parameters in DB and returns a JSON object with a URL that the PIM will open
   */
  public async handleSlotInteraction(
    params: SlotInteractionParams,
  ): Promise<SlotResponse> {
    const { slot, instance, user, object, locale } = params

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

    // Return URL with session ID
    const url = `${appUrl}/api/session/${session.id}`

    console.log('Generated slot interaction URL:', url)

    return { url }
  }

  /**
   * Get a slot session by ID
   */
  public async getSessionById(sessionId: string) {
    const session = await prisma.slotSession.findUnique({
      where: { id: sessionId },
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
        ids: session.objectIds?.split(',') ?? [],
      },
      locale: {
        data: session.dataLocale,
        interface: session.interfaceLocale,
      },
      createdAt: session.createdAt,
    }
  }
}

export const quableLifecycleService = new QuableLifecycleService()

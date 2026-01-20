import { Response, Request } from 'express'
import { quableLifecycleService } from '../services/quable-lifecycle.service.js'

class QuableLifecycleController {
  /**
   * Point 1: Permission endpoint
   * GET /permission
   * Returns the permissions required by the app (e.g., ["read_access"] or ["full_access"])
   */
  public getPermission = async (req: Request, res: Response) => {
    const quablePIMScope = req.app?.settings?.quable_pim_scope
    if (quablePIMScope) {
      return res.status(200).json(quablePIMScope)
    } else {
      return res.status(404).json({ error: 'quable_pim_scope not found' })
    }
  }

  /**
   * Point 2: Installation endpoint
   * POST /install?quableInstanceName=xxx&interfaceLocale=en-US&dataLocale=fr_FR
   * Called when the app is installed on a Quable instance
   */
  public install = async (req: Request, res: Response) => {
    const { quableInstanceName, interfaceLocale, dataLocale } = req.query

    console.log('Installation request received:', {
      quableInstanceName,
      interfaceLocale,
      dataLocale,
      body: req.body,
    })

    const result = await quableLifecycleService.handleInstallation({
      quableInstanceName: quableInstanceName as string,
      interfaceLocale: interfaceLocale as string,
      dataLocale: dataLocale as string,
    })

    return res.status(result.statusCode).json(result)
  }

  /**
   * Point 3: Configuration page
   * GET /?applicationType=x&quableInstanceName=x&interfaceLocale=x&dataLocale=x&userId=x
   * Returns HTML content to be displayed in the Quable PIM iframe
   */
  public getConfigurationPage = async (req: Request, res: Response) => {
    const { applicationType, quableInstanceName, interfaceLocale, dataLocale, userId } = req.query

    console.log('Configuration page request received:', {
      applicationType,
      quableInstanceName,
      interfaceLocale,
      dataLocale,
      userId,
    })

    const result = await quableLifecycleService.getConfigurationPage({
      applicationType: applicationType as string,
      quableInstanceName: quableInstanceName as string,
      interfaceLocale: interfaceLocale as string,
      dataLocale: dataLocale as string,
      userId: userId as string,
    })

    res.setHeader('Content-Type', 'text/html')
    return res.status(200).send(result.html)
  }

  /**
   * Point 4: Slot interaction
   * POST /?slot=x
   * Returns JSON with URL to be opened by the PIM
   */
  public handleSlotInteraction = async (req: Request, res: Response) => {
    const slot = req.query.slot as string

    console.log('Slot interaction request received:', {
      slot,
      body: req.body,
      headers: {
        'client-id': req.headers['client-id'],
        referer: req.headers['referer'],
      },
    })

    const result = await quableLifecycleService.handleSlotInteraction({
      slot,
      instance: req.body?.instance,
      user: req.body?.user,
      object: req.body?.object,
      locale: req.body?.locale,
    })

    return res.status(200).json(result)
  }

  /**
   * Get session by ID
   * GET /api/session/:id
   * Returns different HTML pages based on slot type
   */
  public getSession = async (req: Request, res: Response) => {
    const { id } = req.params

    const session = await quableLifecycleService.getSessionById(id)

    if (!session) {
      return res.status(404).json({ error: 'Session not found' })
    }

    let html: string

    switch (session.slot) {
      case 'document.action.single':
        html = this.renderSingleActionPage(session)
        break
      case 'document.action.bulk':
        html = this.renderBulkActionPage(session)
        break
      case 'document.page.tab':
        html = this.renderPageTabPage(session)
        break
      default:
        html = this.renderDefaultPage(session)
    }

    res.setHeader('Content-Type', 'text/html')
    return res.status(200).send(html)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderSingleActionPage(session: any): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Single Document Action</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 40px;
      max-width: 500px;
      margin: 0 auto;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }
    .icon { font-size: 48px; margin-bottom: 20px; }
    h1 { color: #11998e; margin-bottom: 10px; font-size: 24px; }
    .subtitle { color: #666; margin-bottom: 30px; }
    .doc-card {
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .doc-card .label { font-size: 12px; opacity: 0.8; text-transform: uppercase; }
    .doc-card .value { font-size: 18px; font-weight: 600; margin-top: 5px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    .info-item { padding: 15px; background: #f5f5f5; border-radius: 8px; }
    .info-item .label { font-size: 11px; color: #999; text-transform: uppercase; }
    .info-item .value { font-size: 14px; color: #333; margin-top: 5px; font-family: monospace; }
    .session-id { font-size: 11px; color: #999; margin-top: 20px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">📄</div>
    <h1>Single Document Action</h1>
    <p class="subtitle">Action on a single document</p>

    <div class="doc-card">
      <div class="label">Document ID</div>
      <div class="value">${session.object.ids[0] || '-'}</div>
      <div class="label" style="margin-top: 15px;">Type</div>
      <div class="value">${session.object.type || '-'}</div>
    </div>

    <div class="info-grid">
      <div class="info-item">
        <div class="label">Instance</div>
        <div class="value">${session.instance.name || '-'}</div>
      </div>
      <div class="info-item">
        <div class="label">User</div>
        <div class="value">${session.user.email || '-'}</div>
      </div>
      <div class="info-item">
        <div class="label">Data Locale</div>
        <div class="value">${session.locale.data || '-'}</div>
      </div>
      <div class="info-item">
        <div class="label">Interface</div>
        <div class="value">${session.locale.interface || '-'}</div>
      </div>
    </div>

    <div class="session-id">Session: ${session.id}</div>
  </div>
</body>
</html>
    `.trim()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderBulkActionPage(session: any): string {
    const docCount = session.object.ids.length
    const docList = session.object.ids
      .map((id: string) => `<li>${id}</li>`)
      .join('')

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bulk Document Action</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 40px;
      max-width: 500px;
      margin: 0 auto;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }
    .icon { font-size: 48px; margin-bottom: 20px; }
    h1 { color: #667eea; margin-bottom: 10px; font-size: 24px; }
    .subtitle { color: #666; margin-bottom: 30px; }
    .count-badge {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 8px 20px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .doc-list {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .doc-list h3 { font-size: 12px; color: #999; text-transform: uppercase; margin-bottom: 10px; }
    .doc-list ul { list-style: none; }
    .doc-list li {
      padding: 8px 12px;
      background: white;
      border-radius: 4px;
      margin-bottom: 8px;
      font-family: monospace;
      font-size: 13px;
      color: #667eea;
    }
    .doc-list li:last-child { margin-bottom: 0; }
    .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    .info-row:last-child { border-bottom: none; }
    .info-row .label { color: #999; font-size: 13px; }
    .info-row .value { color: #333; font-size: 13px; font-family: monospace; }
    .session-id { font-size: 11px; color: #999; margin-top: 20px; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">📚</div>
    <h1>Bulk Document Action</h1>
    <p class="subtitle">Action on multiple documents</p>

    <div class="count-badge">${docCount} document${docCount > 1 ? 's' : ''} selected</div>

    <div class="doc-list">
      <h3>Document IDs</h3>
      <ul>${docList}</ul>
    </div>

    <div class="info-row">
      <span class="label">Document Type</span>
      <span class="value">${session.object.type || '-'}</span>
    </div>
    <div class="info-row">
      <span class="label">Instance</span>
      <span class="value">${session.instance.name || '-'}</span>
    </div>
    <div class="info-row">
      <span class="label">User</span>
      <span class="value">${session.user.email || '-'}</span>
    </div>
    <div class="info-row">
      <span class="label">Admin</span>
      <span class="value">${session.user.admin ? 'Yes' : 'No'}</span>
    </div>

    <div class="session-id">Session: ${session.id}</div>
  </div>
</body>
</html>
    `.trim()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderPageTabPage(session: any): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document Page Tab</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8f9fa;
      min-height: 100vh;
    }
    .tab-header {
      background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
      color: white;
      padding: 30px 40px;
    }
    .tab-header .icon { font-size: 32px; margin-bottom: 10px; }
    .tab-header h1 { font-size: 20px; margin-bottom: 5px; }
    .tab-header .doc-info { opacity: 0.9; font-size: 14px; }
    .content {
      padding: 30px 40px;
    }
    .section {
      background: white;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .section h2 {
      font-size: 14px;
      color: #ff6b6b;
      text-transform: uppercase;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #fff0f0;
    }
    .field { display: flex; margin-bottom: 12px; }
    .field:last-child { margin-bottom: 0; }
    .field .label { color: #999; width: 100px; flex-shrink: 0; font-size: 13px; }
    .field .value { color: #333; font-size: 13px; }
    .embedded-notice {
      background: #fff0f0;
      border-left: 4px solid #ff6b6b;
      padding: 15px;
      border-radius: 0 8px 8px 0;
      font-size: 13px;
      color: #666;
    }
    .session-id { font-size: 11px; color: #999; text-align: center; padding: 20px; }
  </style>
</head>
<body>
  <div class="tab-header">
    <div class="icon">📑</div>
    <h1>Document Page Tab</h1>
    <div class="doc-info">${session.object.type || 'Document'}: ${session.object.ids[0] || '-'}</div>
  </div>

  <div class="content">
    <div class="embedded-notice">
      This tab is embedded in the document page of the Quable PIM.
    </div>

    <div class="section">
      <h2>Context</h2>
      <div class="field">
        <span class="label">Instance</span>
        <span class="value">${session.instance.name || '-'}</span>
      </div>
      <div class="field">
        <span class="label">Instance URL</span>
        <span class="value">${session.instance.url || '-'}</span>
      </div>
    </div>

    <div class="section">
      <h2>User</h2>
      <div class="field">
        <span class="label">Email</span>
        <span class="value">${session.user.email || '-'}</span>
      </div>
      <div class="field">
        <span class="label">Admin</span>
        <span class="value">${session.user.admin ? 'Yes' : 'No'}</span>
      </div>
    </div>

    <div class="section">
      <h2>Locale</h2>
      <div class="field">
        <span class="label">Data</span>
        <span class="value">${session.locale.data || '-'}</span>
      </div>
      <div class="field">
        <span class="label">Interface</span>
        <span class="value">${session.locale.interface || '-'}</span>
      </div>
    </div>

    <div class="session-id">Session: ${session.id}</div>
  </div>
</body>
</html>
    `.trim()
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderDefaultPage(session: any): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Session Parameters</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #636e72 0%, #2d3436 100%);
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container {
      background: white;
      border-radius: 12px;
      padding: 40px;
      max-width: 600px;
      margin: 0 auto;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    }
    h1 { color: #333; margin-bottom: 20px; font-size: 24px; }
    .slot-badge {
      display: inline-block;
      background: #636e72;
      color: white;
      padding: 5px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-family: monospace;
      margin-bottom: 20px;
    }
    .section { margin-bottom: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px; }
    .section-title { font-weight: 600; color: #636e72; margin-bottom: 10px; font-size: 14px; text-transform: uppercase; }
    .field { display: flex; margin-bottom: 8px; }
    .field-label { color: #666; width: 120px; flex-shrink: 0; }
    .field-value { color: #333; font-family: monospace; word-break: break-all; }
    .session-id { font-size: 12px; color: #999; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Session Parameters</h1>
    <div class="slot-badge">${session.slot}</div>

    <div class="section">
      <div class="section-title">Instance</div>
      <div class="field">
        <span class="field-label">Name:</span>
        <span class="field-value">${session.instance.name || '-'}</span>
      </div>
      <div class="field">
        <span class="field-label">URL:</span>
        <span class="field-value">${session.instance.url || '-'}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">User</div>
      <div class="field">
        <span class="field-label">Email:</span>
        <span class="field-value">${session.user.email || '-'}</span>
      </div>
      <div class="field">
        <span class="field-label">Admin:</span>
        <span class="field-value">${session.user.admin ? 'Yes' : 'No'}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Object</div>
      <div class="field">
        <span class="field-label">Type:</span>
        <span class="field-value">${session.object.type || '-'}</span>
      </div>
      <div class="field">
        <span class="field-label">IDs:</span>
        <span class="field-value">${session.object.ids.length > 0 ? session.object.ids.join(', ') : '-'}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Locale</div>
      <div class="field">
        <span class="field-label">Data:</span>
        <span class="field-value">${session.locale.data || '-'}</span>
      </div>
      <div class="field">
        <span class="field-label">Interface:</span>
        <span class="field-value">${session.locale.interface || '-'}</span>
      </div>
    </div>

    <div class="session-id">
      Session ID: ${session.id}<br>
      Created: ${session.createdAt.toISOString()}
    </div>
  </div>
</body>
</html>
    `.trim()
  }
}

export const quableLifecycleController = new QuableLifecycleController()

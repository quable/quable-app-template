import { Response, Request } from 'express'
import { appService } from '../services/app.service.js'

class AppController {
  public getQuablePIMScope = async (req: Request, res: Response) => {
    const quablePIMScope = req.app?.settings?.quable_pim_scope
    if (quablePIMScope) {
      return res.status(200).send(quablePIMScope)
    } else {
      return res.status(404).send('quable_pim_scope not found')
    }
  }

  public installApp = async (req: Request, res: Response) => {
    const response = await appService.installApp(req.body)
    return res.status(response.statusCode).send(response)
  }

  public launchDocumentApp = async (req: Request, res: Response) => {
    const launchResponse = await appService.launchDocumentApp(req.body)
    return res.status(launchResponse.statusCode).send(launchResponse)
  }
}

export const appController = new AppController()

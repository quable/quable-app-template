import { appService } from 'src/services/app.service';
import { Response } from 'express';

class AppController {
  public renderIndexPage = async (_req: any, res: Response) => {
    return res.render('pages/index.ejs');
  };

  public getQuablePIMScope = async (req: any, res: Response) => {
    const quablePIMScope = req.app?.settings?.quable_pim_scope;
    if (quablePIMScope) {
      return res.status(200).send(quablePIMScope);
    } else {
      return res.status(404).send('quable_pim_scope not found');
    }
  };

  public installApp = async (req: any, res: Response) => {
    const response = await appService.installApp(req.body);
    return res.status(response.statusCode).send(response);
  };

  public launchDocumentApp = async (req: any, res: Response) => {
    const launchResponse = await appService.launchDocumentApp(req.body);
    return res.status(launchResponse.statusCode).send(launchResponse);
  };
}

export const appController = new AppController();

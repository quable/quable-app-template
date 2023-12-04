import { appController } from 'src/controllers/app.controller';
import { Router } from 'express';

const appRouter = Router();

appRouter.get('/', appController.renderIndexPage);

appRouter.get('/permission', appController.getQuablePIMScope);

appRouter.post('/', appController.launchDocumentApp);

appRouter.post('/install', appController.installApp);

export default appRouter;

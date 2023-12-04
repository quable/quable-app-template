import express, { Request, Response } from 'express';
import expressLayouts from 'express-ejs-layouts';

import { join } from 'path';
import appRouter from './routes/app.routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { setupAppConfig } from './helper/config';
import { httpLoggerMiddleware } from './middlewares/http-logger.middleware';
import { sessionMiddleware } from './middlewares/session.middleware';

async function bootstrapApp() {
  const app = express();

  await setupAppConfig(app);

  // Security
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));

  // Middleware
  app.use(httpLoggerMiddleware);
  app.use(sessionMiddleware);

  // Views
  app.use(expressLayouts);
  app.use(express.static(join(__dirname, '..', 'public')));
  app.set('view engine', 'ejs');
  app.set('views', join(__dirname, '..', 'public', 'views'));
  app.set('layout', 'layouts/layout');

  // Routes
  app.use('/', appRouter);

  // 404
  app.use((_req: Request, res: Response) => {
    return res.status(404).send({ message: 'Not found' });
  });

  // 500
  app.use((_error: any, _req: Request, res: Response) => {
    return res.status(500).send({ message: 'Internal server error' });
  });

  const PORT = parseInt(process.env.QUABLE_APP_PORT || '4000');
  app.listen(PORT, () =>
    console.info(
      `Server started on port: ${PORT} and host: ${process.env.QUABLE_APP_HOST_URL}`,
    ),
  );
}

bootstrapApp();

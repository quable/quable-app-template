import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { setupAppConfig } from './config.js'
import { sessionMiddleware } from './middlewares/session.middleware.js'
import appRouter from './routes/app.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function bootstrapApp() {
  const app = express()

  await setupAppConfig(app)

  // Security
  app.use(cors())
  app.use(express.json())
  app.use(cookieParser())
  app.use(express.urlencoded({ extended: true }))

  // Middleware
  app.use(morgan('dev'))
  app.use(sessionMiddleware)

  // API Routes
  app.use('/api', appRouter)

  // Serve static files from the React app in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, '../../dist/client')))

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(join(__dirname, '../../dist/client/index.html'))
    })
  }

  // 404
  app.use((_req: Request, res: Response) => {
    return res.status(404).send({ message: 'Not found' })
  })

  // 500
  app.use((_error: Error, _req: Request, res: Response) => {
    console.error(_error)
    return res.status(500).send({ message: 'Internal server error' })
  })

  const PORT = parseInt(process.env.QUABLE_APP_PORT || '4000')
  app.listen(PORT, () =>
    console.info(
      `Server started on port: ${PORT} and host: ${process.env.QUABLE_APP_HOST_URL}`,
    ),
  )
}

bootstrapApp()

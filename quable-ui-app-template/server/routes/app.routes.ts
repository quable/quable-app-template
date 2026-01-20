import { Router } from 'express'
import { appController } from '../controllers/app.controller.js'

const router = Router()

router.get('/permission', appController.getQuablePIMScope)
router.get('/quable-pim-scope', appController.getQuablePIMScope)
router.post('/install', appController.installApp)
router.post('/launch', appController.launchDocumentApp)

export default router

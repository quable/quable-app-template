import { Router } from 'express'
import { quableLifecycleController } from '../controllers/quable-lifecycle.controller.js'

const router = Router()

// 1: Permission - GET /permission
router.get('/permission', quableLifecycleController.getPermission)

// 2: Installation - POST /install
router.post('/install', quableLifecycleController.install)

// 3: Configuration page - GET /?applicationType=x&quableInstanceName=x&...
router.get('/', quableLifecycleController.getConfigurationPage)

// 4: Slot interaction - POST /?slot=x
router.post('/', quableLifecycleController.handleSlotInteraction)

// 5: Get session by ID - displays stored slot session parameters
router.get('/api/session/:id', quableLifecycleController.getSession)

export default router

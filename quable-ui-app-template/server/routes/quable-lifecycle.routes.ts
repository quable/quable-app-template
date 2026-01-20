import { Router } from 'express'
import { quableLifecycleController } from '../controllers/quable-lifecycle.controller.js'

const router = Router()

// 1: Permission - GET /permission
router.get('/permission', quableLifecycleController.getPermission)

// 2: Installation - POST /install
router.post('/install', quableLifecycleController.install)

// 3 & 4: Configuration page (POST /) and Slot interaction (POST /?slot=x)
// Both are handled by the same route, distinguished by the presence of the slot query param
router.post('/', quableLifecycleController.handleRootPost)

// 5: Get session by ID - displays stored slot session parameters
router.get('/api/session/:id', quableLifecycleController.getSession)

export default router

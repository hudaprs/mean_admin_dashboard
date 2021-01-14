import app from 'express'
import { authMiddleware } from '../middleware/index.js'
import { getAuthenticatedUser, login } from '../app/controllers/index.js'

const router = app.Router()

router.get('/', authMiddleware, getAuthenticatedUser)
router.post('/', login)

export default router

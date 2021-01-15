import app from 'express'
import { authMiddleware, paginatorMiddleware } from '../middleware/index.js'
import { getTokens, refreshToken } from '../app/controllers/index.js'

const router = app.Router()

router.get('/', [authMiddleware, paginatorMiddleware], getTokens)
router.get('/refresh', refreshToken)

export default router

import app from 'express'
const router = app.Router()

import { authMiddleware, paginatorMiddleware } from '../middleware/index.js'
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../app/controllers/index.js'

router.get('/', [authMiddleware, paginatorMiddleware], getUsers)
router.post('/', createUser)
router.get('/:id', authMiddleware, getUser)
router.put('/:id', authMiddleware, updateUser)
router.delete('/:id', authMiddleware, deleteUser)

export default router

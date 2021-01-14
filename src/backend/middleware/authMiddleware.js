import jwt from 'jsonwebtoken'
import { User } from '../app/models/index.js'

export default async (req, res, next) => {
  try {
    const authorization = req.headers.authorization

    if (!authorization) {
      res.status(401)
      throw new Error('Authorization header required')
    }

    const splitAuthorization = authorization.split(' ')
    const bearer = splitAuthorization[0]
    const token = splitAuthorization[1]
    if (bearer !== 'Bearer') {
      res.status(401)
      throw new Error('Authorization must be type of Bearer')
    }

    if (!token) {
      res.status(401)
      throw new Error('Authorization token required')
    }

    let decodeJWT = jwt.verify(token, process.env.JWT_TOKEN_SECRET)

    const user = await User.findById(decodeJWT.id)
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    req.userId = decodeJWT.id

    next()
  } catch (err) {
    let message = err.message
    console.error('AUTH MIDDLWARE ERROR', err)
    if (err.message === 'jwt malformed' || err.message === 'jwt expired') {
      res.status(401)
      message = 'JWT error'
    }
    res.status(res.statusCode).json(message)
  }
}

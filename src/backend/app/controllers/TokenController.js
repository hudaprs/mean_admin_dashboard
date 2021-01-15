import { User, Token } from '../models/index.js'
import { generateToken } from '../services/index.js'
import { _checkUserExistance } from '../services/index.js'
import jwt from 'jsonwebtoken'

export const getTokens = async (req, res) => {
  try {
    res.status(200).json(await res.paginate(Token.find({})))
  } catch (err) {
    console.error(err)
  }
}

export const refreshToken = async (req, res) => {
  try {
    if (!req.query.refreshToken || !req.query.userId) {
      res.status(400)
      throw new Error('Request not meet requirement')
    }

    let token = await Token.findOne({
      refreshToken: req.query.refreshToken
    })
    if (!token) {
      res.status(404)
      throw new Error('Refresh token not found from our record')
    }

    let user = await User.findById(req.query.userId)
    if (!user) {
      res.status(404)
      throw new error('User not recognized')
    }

    let { token: newToken, refreshToken } = await generateToken(
      {
        user: {
          id: user._id
        }
      },
      req.query.refreshToken
    )

    return res.status(200).json({
      token: newToken,
      refreshToken,
      user: {
        ...user._doc,
        password: undefined
      }
    })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(res.statusCode).json('User Not found')
    }

    return res.status(res.statusCode).json(err.message)
  }
}

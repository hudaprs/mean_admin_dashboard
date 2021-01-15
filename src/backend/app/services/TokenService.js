import { Token, User } from '../models/index.js'
import jwt from 'jsonwebtoken'

export const generateToken = async (
  tokenPayload = {},
  existedRefreshToken = null
) => {
  try {
    const commonToken = jwt.sign(tokenPayload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: '5s'
    })
    const refreshToken = jwt.sign(
      tokenPayload,
      process.env.JWT_REFRESH_TOKEN_SECRET
    )

    let token = await Token.findOne({ user: tokenPayload.user.id })
    if (token) {
      await Token.findByIdAndRemove(token._id)
    }

    const user = await User.findById(tokenPayload.user.id)
    if (!user) {
      res.status(401)
      throw new Error('User not recognized')
    }

    token = new Token({
      refreshToken,
      user: tokenPayload.user.id
    })

    await token.save()

    delete user.password
    return {
      token: commonToken,
      refreshToken,
      user
    }
  } catch (err) {
    res.status(res.statusCode).json(err.message)
  }
}

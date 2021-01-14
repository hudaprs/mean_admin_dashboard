import bcrypt from 'bcryptjs'
import { User } from '../models/index.js'
import jwt from 'jsonwebtoken'

export const getAuthenticatedUser = async (req, res) => {
  try {
    res.status(200).json({ message: 'You succesfully authenticated' })
  } catch (err) {
    console.error(err)
  }
}

export const login = async (req, res) => {
  let { email, password } = req.body

  // Simple validation
  if (!email || !password)
    return res.status(422).json({ message: 'Please fill all forms' })

  try {
    let user = await User.findOne({
      email: email.toLowerCase().replace(' ', '', '/s+/')
    })

    if (!user) return res.status(422).json({ message: 'Invalid credentials' })

    const comparePassword = await bcrypt.compare(password, user.password)

    if (!comparePassword)
      return res.status(422).json({ message: 'Invalid credentials' })

    return jwt.sign(
      { id: user._id },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw new Error(err)

        return res.status(200).json(token)
      }
    )
  } catch (err) {
    console.error(err)
  }
}

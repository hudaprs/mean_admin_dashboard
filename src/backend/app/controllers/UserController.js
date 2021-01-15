import bcrypt from 'bcryptjs'
import { User } from '../models/index.js'

export const getUsers = async (req, res) => {
  try {
    let searchQuery = {
      $text: {
        $search: req.query?.name
      }
    }

    res.json(
      await res.paginate(
        User.find(req.query.name ? searchQuery : {}).select('-password')
      )
    )
  } catch (err) {
    console.error(err)
  }
}

export const getUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id).select('-password')

    return res.status(200).json(user)
  } catch (err) {
    console.error(err)
  }
}

export const createUser = async (req, res) => {
  let { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(422).json({ message: 'Please fill all forms' })
  }

  try {
    let user = await User.findOne({
      email: email.toLowerCase().replace(' ', '', '/s+/')
    })

    if (user) return res.status(400).json({ message: 'User already exists' })

    user = new User({
      name,
      email
    })

    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(password, salt)

    user.password = hashedPassword

    await user.save()

    return res.status(201).json(user)
  } catch (err) {
    console.error(err)
  }
}

export const updateUser = async (req, res) => {
  if (!req.params.id || !req.body.name) {
    res.status(422).json({ message: 'Please fill all forms' })
  }

  try {
    let user = await User.findById(req.params.id)

    user.name = req.body.name
    user.save()

    return res.status(200).json(user)
  } catch (err) {
    console.error(err)
  }
}

export const deleteUser = async (req, res) => {
  try {
    let user = await User.findByIdAndRemove(req.params.id)

    res.json(user)
  } catch (err) {
    console.error(err)
  }
}

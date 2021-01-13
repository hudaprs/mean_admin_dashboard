import express from 'express'
import mongoose from 'mongoose'
import paginator from './paginator.js'
import cors from 'cors'
import User from './User.js'
import bcrypt from 'bcryptjs'
import _ from 'lodash'
global._ = _

export const mongooseConnect = async () => {
  try {
    await mongoose.connect('mongodb://localhost/user-management', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    console.log('mongoDB connected')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

mongooseConnect()

const app = express()

app.use(express.json({ extended: false }))
app.use(cors())

app.get('/api/users', paginator, async (req, res) => {
  try {
    let searchQuery = {
      $text: {
        $search: req.query?.name
      }
    }

    res.json(await res.paginate(User.find(req.query.name ? searchQuery : {})))
  } catch (err) {
    console.error(err)
  }
})

app.post('/api/users', async (req, res) => {
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

    user.save()

    return res.status(201).json(user)
  } catch (err) {
    console.error(err)
  }
})

app.get('/api/users/:id', async (req, res) => {
  try {
    let user = await User.findById(req.params.id)

    return res.status(200).json(user)
  } catch (err) {
    console.error(err)
  }
})

app.put('/api/users/:id', async (req, res) => {
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
})

app.delete('/api/users/:id', async (req, res) => {
  try {
    let user = await User.findByIdAndRemove(req.params.id)

    res.json(user)
  } catch (err) {
    console.error(err)
  }
})

app.listen(5000, () => console.log(`Server started`))

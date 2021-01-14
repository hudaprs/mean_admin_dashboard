import dotenv from 'dotenv'
import _ from 'lodash'
dotenv.config()
global._ = _

import express from 'express'
import { mongooseConnect } from './config/index.js'
import cors from 'cors'
import routes from './routes/index.js'

mongooseConnect()

const app = express()

app.use(express.json({ extended: false }))
app.use(cors())

// Init routes
routes(app)

app.listen(5000, () => console.log(`Server started`))

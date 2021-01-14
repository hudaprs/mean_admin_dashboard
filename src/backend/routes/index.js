import authRoute from './authRoute.js'
import userRoute from './userRoute.js'
import tokenRoute from './tokenRoute.js'

export default app => {
  app.use('/api/auth', authRoute)
  app.use('/api/users', userRoute)
  app.use('/api/token', tokenRoute)
}

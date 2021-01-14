import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

userSchema.index({ name: 'text' })

export default mongoose.model('User', userSchema)

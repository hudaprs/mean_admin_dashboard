import mongoose from 'mongoose'

export default async () => {
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

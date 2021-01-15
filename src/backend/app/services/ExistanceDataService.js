import { User } from '../models/index.js'

export const _checkUserExistance = async userId => {
  let user = await User.findById(userId).select('-password')
  return user
}

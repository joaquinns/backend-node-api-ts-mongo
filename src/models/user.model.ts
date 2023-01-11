import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { IUser } from '../interfaces/user.interface'

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  let user = this as IUser
  if (!user.isModified) next()
  const salt = await bcrypt.genSalt(10)
  const hash = bcrypt.hashSync(user.password, salt)
  user.password = hash
  return next()
})

userSchema.methods.comparePasswords = async function (
  candidatePass: string
): Promise<boolean> {
  let user = this as IUser
  return bcrypt.compare(candidatePass, user.password).catch((e) => false)
}

export const bcryptHash = async (query: string) => {
  const salt = await bcrypt.genSalt(10)
  const hash = bcrypt.hashSync(query, salt)
  return hash
}

export const userModel = mongoose.model('User', userSchema)

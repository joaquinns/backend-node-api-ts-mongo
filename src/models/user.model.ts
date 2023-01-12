import bcrypt from 'bcrypt'
import { Model, model, Schema } from 'mongoose'
import { IUser, IUserMethods } from '../interfaces/user.interface'

type UserModel = Model<IUser, {}, IUserMethods>

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
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
  if (!this.isModified) next()
  const salt = await bcrypt.genSalt(10)
  const hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  return next()
})

userSchema.method(
  'comparePasswords',
  async function (candidatePass: string): Promise<boolean> {
    let user = this as IUser
    return bcrypt.compare(candidatePass, user.password).catch((e) => false)
  }
)

export const bcryptHash = async (query: string) => {
  const salt = await bcrypt.genSalt(10)
  const hash = bcrypt.hashSync(query, salt)
  return hash
}

export const userModel = model<IUser, UserModel>('User', userSchema)

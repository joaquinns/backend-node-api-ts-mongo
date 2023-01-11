import { Types } from 'mongoose'

export type User = {
  id?: Types.ObjectId
  name: string
  email: string
  password: string
}

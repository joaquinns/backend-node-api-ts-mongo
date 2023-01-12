import { Types } from 'mongoose'
export interface IUser {
  id?: Types.ObjectId
  name: string
  email: string
  password: string
  //comparePasswords: (candidatePass: string) => Promise<boolean>
}

export interface IUserMethods {
  comparePasswords(candidatePass: string): Promise<boolean>
}

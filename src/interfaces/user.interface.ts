import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'
export interface IUser {
  id?: Types.ObjectId
  name: string
  email: string
  password: string
}

export interface IUserMethods {
  comparePasswords(candidatePass: string): Promise<boolean>
}

export interface RequestWithUser extends Request {
  user?: JwtPayload | string
}

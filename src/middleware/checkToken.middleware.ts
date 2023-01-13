import 'dotenv/config'
import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { RequestWithUser } from '../interfaces/user.interface'
import { loggerError } from '../utils/logger'

const checkToken = async (
  req: RequestWithUser,
  _res: Response,
  next: NextFunction
) => {
  try {
    const jwtFromTheUser = req.headers.authorization
    if (!jwtFromTheUser) {
      throw {
        statusCode: 401,
        message: 'Unauthorized'
      }
    }
    const token = jwtFromTheUser!.split(' ').pop()
    const valid = (await jwt.verify(
      token!,
      process.env.JWT_SECRET || 'secreto'
    )) as { id: string; exp: number; iat: number }
    if (!valid) {
      throw {
        statusCode: 401,
        message: 'Unauthorized'
      }
    }
    req.user = valid.id
    next()
  } catch (error: any) {
    loggerError(
      `[ERROR CHECK TOKEN MIDDLEWARE] ${(error.message, error.stack)}`
    )
    error.statusCode = 401
    error.message = 'Unauthorized'
    next(error)
  }
}

export default checkToken

import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { loggerError } from '../utils/logger'

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtFromTheUser = req.headers.authorization
    if (!jwtFromTheUser) {
      throw {
        statusCode: 422,
        message: 'Unauthorized'
      }
    }
    const token = jwtFromTheUser!.split(' ').pop()
    const valid = await jwt.verify(token!, process.env.JWT_SECRET || 'secreto')
    if (!valid) {
      throw {
        statusCode: 422,
        message: 'Unauthorized'
      }
    }
    next()
  } catch (error: any) {
    loggerError(
      `[ERROR CHECK TOKEN MIDDLEWARE] ${(error.message, error.stack)}`
    )
    next(error)
  }
}

export default checkToken

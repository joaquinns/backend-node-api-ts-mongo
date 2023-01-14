import 'dotenv/config'
import { NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { userModel } from '../models/user.model'
import { authLoginInput } from '../schemas/auth.schema'
import { loggerError, loggerInfo } from '../utils/logger'

export const authLogin = async (auth: authLoginInput, next: NextFunction) => {
  try {
    const foundedUser = await userModel.findOne({ email: auth.email })

    if (!foundedUser) {
      throw {
        statusCode: 403,
        message: 'email or password incorrect'
      }
    }

    const validPassword = await foundedUser.comparePasswords(auth.password)
    if (!validPassword) {
      loggerInfo('No paso huele bicho')
      throw {
        statusCode: 403,
        message: 'email or password incorrect'
      }
    }

    const token = await jwt.sign(
      {
        id: foundedUser.id
      },
      <string>process.env.SECRET,
      {
        expiresIn: 86400
      }
    )

    return { token }
  } catch (error: any) {
    loggerError(
      `[ERROR AUTH LOGIN SERVICE] ${
        (error.message, error?.stack && error.stack)
      }`
    )
    next(error)
  }
}

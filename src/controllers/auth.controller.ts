import { NextFunction, Request, Response } from 'express'
import { createUserInput } from '../schemas/user.schema'
import { authLogin } from '../services/auth.service'
import { createUser } from '../services/user.service'
import { loggerError } from '../utils/logger'

/**
 *  Register controller to insert a new user in the database
 * @param req
 * @param res
 * @returns
 */
export const authRegisterHandler = async (
  req: Request<{}, {}, createUserInput>,
  res: Response
) => {
  try {
    const newUser = await createUser(req.body)
    return res.status(201).json(newUser)
  } catch (error: any) {
    loggerError(`[ERROR AUTH REGISTER CONTROLLER] ${error.message}`)
    return res.status(409).send(error.message)
  }
}

/**
 * Login controller to be authorized in the app
 * @param req
 * @param res
 * @param next
 * @returns
 */

export const authLoginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const login = await authLogin(req.body, next)
    if (!login) {
      throw {
        statusCode: 400,
        message: 'Bad request'
      }
    }
    const { token } = login
    return res.json({ message: 'Login Success!', token })
  } catch (error: any) {
    loggerError(`[ERROR AUTH CONTROLLER] ${error.message}`)
    next(error)
  }
}

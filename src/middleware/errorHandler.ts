import { NextFunction, Request, Response } from 'express'
import { loggerError } from '../utils/logger'

/**
 * Middleware function to handle the errors of the app
 * @param err - Global error
 * @param req
 * @param res - Response of the express server
 * @param next - Express next function
 */
const ErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    next()
  }
  loggerError(`[MIDDLEWARE ERROR HANDLER] ${err.message}`)
  const errStatus: number =
    err.statusCode ||
    (((err.message === 'invalid token' && 400) ||
      err.message.includes('Cast to ObjectId failed')) &&
      404) ||
    500
  const errMsg: string = err.message || 'Something went wrong'
  const stack: string = err.stack
  return res.status(errStatus).send({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? stack : {}
  })
}

export default ErrorHandler

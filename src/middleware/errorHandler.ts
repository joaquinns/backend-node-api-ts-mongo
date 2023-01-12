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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    next()
  }
  loggerError(`[MIDDLEWARE ERROR HANDLER] ${err.message}`)
  const errStatus =
    err.statusCode || (err.message === 'invalid token' && 400) || 500
  const errMsg = err.message || 'Something went wrong'
  return res.status(errStatus).send({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  })
}

export default ErrorHandler

import { NextFunction, Request, Response } from 'express'
import { createUserInput, updateUserInput } from '../schemas/user.schema'
import {
  createUser,
  deleteUser,
  findUserById,
  getUsers,
  updateUser
} from '../services/user.service'
import { loggerError } from '../utils/logger'

/**
 * Get users controller to retrieve all the users or one user from the database
 *
 * @param req
 * @param res
 * @returns
 */
export const getUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let id = req.query.id as string | undefined
    let page = parseInt(req.query.page as string) || 1
    let limit = parseInt(req.query.limit as string) || 15
    const users = await getUsers(page, limit, next, id)
    if (!users) {
      throw {
        statusCode: 404,
        message: 'User not found in our records'
      }
    }
    return res.json(users)
  } catch (error: any) {
    loggerError(`[ERROR CONTROLLER] ${error.message}`)
    next(error)
  }
}
/**
 * Create user controller to insert a new user into the database
 *
 * @param req
 * @param res
 * @returns
 */
export const createUserHandler = async (
  req: Request<{}, {}, createUserInput>,
  res: Response
) => {
  try {
    const newUser = await createUser(req.body)
    return res.status(201).json(newUser)
  } catch (error: any) {
    loggerError(`[ERROR CONTROLLER] ${error}`)
    res.status(409).json(error.message)
  }
}
/**
 * Update user controller to change any input of an user
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const updateUserHandler = async (
  req: Request<{}, {}, updateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.query.id as string
    if (!id) {
      throw {
        statusCode: 400,
        message: 'You need to pass an id'
      }
    }
    const foundedUser = await findUserById(id)
    if (!foundedUser) {
      throw {
        statusCode: 404,
        message: 'User not found in our records'
      }
    }
    const updatedUser = await updateUser(id, req.body)
    return res.json(updatedUser)
  } catch (error: any) {
    loggerError(`[ERROR CONTROLLER] ${error}`)
    next(error)
  }
}

/**
 * Delete controller to delete an user from the database
 * @param req
 * @param res
 * @param next
 * @returns
 */

export const deleteUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.query.id as string
    const deletedUser = await deleteUser(id, next)
    if (!deletedUser) {
      throw {
        statusCode: 404,
        message: 'User not found in our records'
      }
    }
    return res.json({ status: 200, message: 'Deleted success!' })
  } catch (error: any) {
    loggerError(`[ERROR CONTROLLER] ${error}`)
    next(error)
  }
}

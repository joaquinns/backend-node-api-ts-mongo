import { NextFunction } from 'express'
import { DocumentDefinition } from 'mongoose'
import { IUser } from '../interfaces/user.interface'
import { bcryptHash, userModel } from '../models/user.model'
import { updateUserInput } from '../schemas/user.schema'
import { loggerError, loggerInfo } from '../utils/logger'

export const getUsers = async (
  page: number,
  limit: number,
  id?: string | undefined
) => {
  try {
    if (id) {
      return await userModel.findById(id).select('-password')
    }

    page < 1 ? (page = 1) : page
    limit < 1 ? (limit = 1) : page
    const users = await userModel
      .find({ isDelete: false })
      // .select('-password')
      .limit(limit)
      .skip((page - 1) * limit)
      .exec()
    const total: number = await userModel.countDocuments()
    const totalPages = Math.ceil(total / limit)
    return {
      users,
      currentPage: page,
      totalPages
    }
  } catch (error) {
    loggerError(`[SERVICE ERROR GETTING USERS] ${error}`)
  }
}

export const createUser = async (
  input: DocumentDefinition<
    Omit<IUser, 'createdAt' | 'updatedAt' | 'comparePasswords'>
  >
) => {
  try {
    return await userModel.create(input)
  } catch (error: any) {
    loggerError(`[SERVICE ERROR CREATING USER] ${error}`)
  }
}

export const updateUser = async (id: string, input: updateUserInput) => {
  try {
    if (input.password!) {
      const hashedPassword = await bcryptHash(input.password!)
      input.password = hashedPassword
    }

    return await userModel.findByIdAndUpdate(id, input, {
      returnDocument: 'after'
    })
  } catch (error: any) {
    loggerError(`[SERVICE ERROR UPDATING USER] ${error}`)
  }
}

export const deleteUser = async (id: string, next: NextFunction) => {
  try {
    loggerInfo(`[api/users/${id}] Deleting user`)
    const deleteUser = await userModel.findOneAndDelete({ _id: id })
    loggerInfo(`USer delete: ${deleteUser}`)
    if (!deleteUser) throw Error()
    return deleteUser
  } catch (error: any) {
    loggerError(`[SERVICE ERROR DELETING USER] ${error}`)
    error.statusCode = 404
    error.status = 'failed'
    error.message = 'Not found'
    loggerError(`${error}`)
    next(error)
  }
}

export const findUserById = async (id: string, next: NextFunction) => {
  try {
    const user = await userModel.findById(id)
    if (!user) {
      throw {
        statusCode: 404,
        message: 'Not found'
      }
    }
    return user
  } catch (error: any) {
    loggerError(`${error}`)
    next(error)
  }
}

import z from 'zod'
import { userModel } from '../models/user.model'

export const createUserSchema = z
  .object({
    name: z
      .string({
        required_error: 'Name is required'
      })
      .min(3, 'Name must have at least 3 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Must be a valid email')
      .refine(
        async (email) => {
          const foundedEmail = await userModel.findOne({ email: email })
          if (foundedEmail) {
            return false
          }
          return true
        },
        {
          message: 'Email is in use',
          path: ['Email']
        }
      ),
    password: z
      .string({
        required_error: 'Password is required'
      })
      .min(6, 'Password must have at least 6 characters'),
    passwordConfirmation: z.string({
      required_error: 'You need to confirm the password'
    })
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['password'],
    message: 'Passwords dont match'
  })

const updateSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required'
    })
    .min(3, 'Name must have at least 3 characters'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Must be a valid email')
    .refine(
      async (email) => {
        const foundedEmail = await userModel.findOne({ email: email })
        if (foundedEmail) {
          return false
        }
        return true
      },
      {
        message: 'Email is in use',
        path: ['Email']
      }
    ),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(6, 'Password must have at least 6 characters'),
  passwordConfirmation: z.string({
    required_error: 'You need to confirm the password'
  })
})

export type createUserInput = z.infer<typeof createUserSchema>

export const updateUserSchema = updateSchema
  .partial()
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ['password'],
    message: 'Passwords dont match'
  })

export type updateUserInput = z.infer<typeof updateUserSchema>

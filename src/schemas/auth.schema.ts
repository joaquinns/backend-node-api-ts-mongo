import z from 'zod'

export const authLoginSchema = z.object({
  email: z.string({
    required_error: 'Email is required to login'
  }),
  password: z.string({
    required_error: 'Password is required to login'
  })
})

export type authLoginInput = z.infer<typeof authLoginSchema>

import supertest from 'supertest'
import { server } from '../../src'

export const api = supertest(server)

export const initialUsers = [
  {
    name: 'Test user 1',
    email: 'testUser1@mail.com',
    password: '123456'
  },
  {
    name: 'Test user 2',
    email: 'testUser2@mail.com',
    password: '123456'
  }
]

export const getUsersResponse = async () => {
  const response = await api.get('/api/users')
  const { users } = response.body
  const usersId = users.map((user: any) => user._id)
  const userEmails = users.map((user: any) => user.email)
  return { users, usersId, userEmails }
}

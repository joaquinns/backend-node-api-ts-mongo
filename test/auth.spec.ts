import { serverTerminator } from '../src'
import { userModel } from '../src/models/user.model'
import { api, getUsersResponse, initialUsers } from './helper'

beforeEach(async () => {
  await userModel.deleteMany({})
  const firstUser = new userModel(initialUsers[0])
  await firstUser.save()
})

test('Register an user in the app', async () => {
  const newUser = {
    name: 'testingName',
    email: 'testingEmail@mail.com',
    password: '123456',
    passwordConfirmation: '123456'
  }

  await api.post('/api/auth/register').send(newUser).expect(201)

  const { users, userEmails } = await getUsersResponse()

  expect(users).toHaveLength(2)
  expect(userEmails).toContain(newUser.email)
})

test('Register an user in the app without body would fail', async () => {
  const newUser = {}

  await api.post('/api/auth/register').send(newUser).expect(409)
})

test('Login a valid user in the app', async () => {
  const loginUser = {
    email: 'testUser1@mail.com',
    password: '123456'
  }

  await api.post('/api/auth/login').send(loginUser).expect(200)
})

test('Login with a invalid email or password would fail', async () => {
  const loginUser = {
    email: 'testUser111111@mail.com',
    password: '1234567'
  }

  await api.post('/api/auth/login').send(loginUser).expect(403)
})

afterAll(async () => {
  await serverTerminator.terminate()
})

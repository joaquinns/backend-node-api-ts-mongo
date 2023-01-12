import { userModel } from '../src/models/user.model'
import { serverTerminator } from '../src/server'
import { api, getUsersResponse, initialUsers } from './helper'

beforeEach(async () => {
  await userModel.deleteMany({})
  const firstUser = new userModel(initialUsers[0])
  await firstUser.save()

  const secondUser = new userModel(initialUsers[1])
  await secondUser.save()
})

test('Users are returned as json format', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('Get one user', async () => {
  const { usersId } = await getUsersResponse()
  const userId = usersId[0]
  await api.get(`/api/users?id=${userId}`).expect(200)

  expect(userId).toContain(userId)
})

test(`Theres ${initialUsers.length} users in the api`, async () => {
  const { users } = await getUsersResponse()
  expect(users).toHaveLength(initialUsers.length)
})

test('Create a new user', async () => {
  const newUser = {
    name: 'New user added',
    password: '123456',
    passwordConfirmation: '123456',
    email: 'newuseremail@mail.com'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-type', /application\/json/)

  const { users, userEmails } = await getUsersResponse()

  expect(users).toHaveLength(initialUsers.length + 1)
  expect(userEmails).toContain(newUser.email)
})

test('Create a new user fail without body', async () => {
  const newUser = {}

  await api
    .post('/api/users')
    .send(newUser)
    .expect(409)
    .expect('Content-type', /application\/json/)
})

test('Update an user', async () => {
  const { usersId } = await getUsersResponse()
  const userId = usersId[0]
  const updateInputs = {
    name: 'exampleTestName'
  }

  await api.put(`/api/users?id=${userId}`).send(updateInputs).expect(200)

  const { users } = await getUsersResponse()
  const updatedUser = users.filter((user: any) => user._id === userId)
  expect(updatedUser[0].name).toContain(updateInputs.name)
})

test('Update an user without id would fail', async () => {
  const updateInputs = {
    name: 'exampleTestName'
  }

  await api.put(`/api/users`).send(updateInputs).expect(400)
})

test('Update an user with a invalid id would fail', async () => {
  const id = '1234567'
  const updateInputs = {
    name: 'exampleTestName'
  }
  await api.put(`/api/users?id=${id}`).send(updateInputs).expect(404)
})

test('Delete an user', async () => {
  const { users } = await getUsersResponse()
  const usersId = users.map((user: any) => user._id)
  console.log(usersId)
  const userIdToDelete = usersId[0]
  await api.delete(`/api/users?id=${userIdToDelete}`).expect(200)

  const { users: usersAfterDelete, usersId: usersIdAfterDelete } =
    await getUsersResponse()
  expect(usersAfterDelete).toHaveLength(initialUsers.length - 1)
  expect(usersIdAfterDelete).not.toContain(userIdToDelete)
})

test('Delete an user without id or not a valid id would fail', async () => {
  await api.delete(`/api/users`).expect(404)
})

afterAll(async () => {
  await serverTerminator.terminate()
})

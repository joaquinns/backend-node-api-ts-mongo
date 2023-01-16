import { serverTerminator } from '../src'
import { userModel } from '../src/models/user.model'
import { api, getUsersResponse, initialUsers } from './helper'

var jwt: string = 'token'
beforeEach(async () => {
  await userModel.deleteMany({})
  const firstUser = new userModel(initialUsers[0])
  const savedUser = await firstUser.save()

  const secondUser = new userModel(initialUsers[1])
  await secondUser.save()

  const reponse = await api
    .post('/api/auth/login')
    .send({ email: savedUser.email, password: '123456' })
  const { token } = reponse.body
  jwt = token
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

  await api
    .put(`/api/users?id=${userId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(updateInputs)
    .expect(200)

  const { users } = await getUsersResponse()
  const updatedUser = users.filter((user: any) => user._id === userId)
  expect(updatedUser[0].name).toContain(updateInputs.name)
})

test('Update an user without id would fail', async () => {
  const updateInputs = {
    name: 'exampleTestName'
  }

  await api
    .put(`/api/users`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(updateInputs)
    .expect(400)
})

test('Update an user with a invalid id would fail', async () => {
  const id = '1234567'
  const updateInputs = {
    name: 'exampleTestName'
  }
  await api
    .put(`/api/users?id=${id}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(updateInputs)
    .expect(404)
})

test('Delete an user without id or not a valid id would fail', async () => {
  await api.delete(`/api/users`).set('Authorization', `Bearer`).expect(401)
})

test('Delete an user', async () => {
  const { users } = await getUsersResponse()
  const usersId = users.map((user: any) => user._id)
  console.log(usersId)
  const userIdToDelete = usersId[0]
  await api
    .delete(`/api/users?id=${userIdToDelete}`)
    .set('Authorization', `Bearer ${jwt}`)
    .expect(200)

  const { users: usersAfterDelete, usersId: usersIdAfterDelete } =
    await getUsersResponse()
  expect(usersAfterDelete).toHaveLength(initialUsers.length - 1)
  expect(usersIdAfterDelete).not.toContain(userIdToDelete)
})

afterAll(async () => {
  await serverTerminator.terminate()
})

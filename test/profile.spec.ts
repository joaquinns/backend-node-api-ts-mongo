import { serverTerminator } from '../src'
import { userModel } from '../src/models/user.model'
import { api, initialUsers } from './helper'

var jwt: string = 'compadre'
beforeAll(async () => {
  await userModel.deleteMany({})
  const firstUser = new userModel(initialUsers[0])
  const newUser = await firstUser.save()
  const reponse = await api
    .post('/api/auth/login')
    .send({ email: newUser.email, password: '123456' })
  const { token } = reponse.body
  jwt = token
})

test('Get the profile of an user', async () => {
  await api
    .get('/api/profile')
    .set('Authorization', `Bearer ${jwt}`)
    .expect(200)
})

test('Get the profile of an user without token would fail', async () => {
  await api.get('/api/profile').set('Authorization', 'bearer').expect(401)
})

afterAll(async () => {
  await serverTerminator.terminate()
})

import express, { Express } from 'express'
import checkToken from '../middleware/checkToken.middleware'
import authRoutes from './auth.router'
import profileRoutes from './profile.router'
import userRoutes from './user.router'

let server: Express = express()

server.use('/users', userRoutes) // api/users
server.use('/auth', authRoutes) // api/auth
server.use('/profile', [checkToken], profileRoutes) // api/profile

export default server

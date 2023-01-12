import express, { Express } from 'express'
import authRoutes from './auth.router'
import userRoutes from './user.router'

let server: Express = express()

let rootRouter = express.Router()

server.use('/', rootRouter) // api/
server.use('/users', userRoutes) // api/users
server.use('/auth', authRoutes) // api/auth

export default server

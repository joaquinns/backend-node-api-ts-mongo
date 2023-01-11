import express, { Express } from 'express'
import userRoutes from './user.router'

let server: Express = express()

let rootRouter = express.Router()

server.use('/', rootRouter) // api/
server.use('/users', userRoutes) // api/users

export default server

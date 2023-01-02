import cors from 'cors'
import 'dotenv/config'
import express, { Express, Response } from 'express'
import helmet from 'helmet'
import router from './routes/index'

// create server
export const app: Express = express()

// config
app.set('port', process.env.PORT || 4000)
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// security
app.use(helmet())
app.use(cors())

// routes
// define /api prefix in all the routes
app.use('/api', router)

// redirects
app.get('/', (_req, res: Response) => res.redirect('/api'))

import cors from 'cors'
import 'dotenv/config'
import express, { Express, Response } from 'express'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import swaggerSetup from './docs/swagger'
import ErrorHandler from './middleware/errorHandler'
import router from './routes/index'

// create server
export const app: Express = express()

// config
app.set('port', process.env.PORT || 8080)
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// security
app.use(helmet())
app.use(cors())

// routes
// define /api prefix in all the routes
app.use('/api', router)

// api documentation endpoint
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup))

app.use(ErrorHandler)

// redirects
app.get('/', (_req, res: Response) => res.redirect('/docs'))

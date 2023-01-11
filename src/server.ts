import mongoose from 'mongoose'
import { app } from './app'
import { loggerError, loggerInfo, loggerSuccess } from './utils/logger'

const DB_URI: string = <string>process.env.DB_URI

mongoose
  .connect(DB_URI)
  .then((_db) => {
    loggerInfo('[DB] CONNECTION UP')
    loggerSuccess('[DB] SUCCESS!')
  })
  .catch((e) => {
    loggerError(`[SERVER ERROR]: ${e}`)
  })

export const server = app.listen(app.get<number>('port'), () => {
  loggerInfo(`[SERVER RUNNING] listening on port ${app.get('port')}`)
})

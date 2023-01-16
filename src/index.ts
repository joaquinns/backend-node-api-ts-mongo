import { createHttpTerminator } from 'http-terminator'
import mongoose from 'mongoose'
import { app } from './app'
import { loggerError, loggerInfo, loggerSuccess } from './utils/logger'

const DB_URI: string =
  process.env.NODE_ENV === 'test'
    ? <string>process.env.DB_URI_TEST
    : <string>process.env.DB_URI

mongoose.set('strictQuery', true)

async function db(): Promise<void> {
  try {
    await mongoose.connect(DB_URI)
    loggerInfo('[DB] CONNECTION UP')
    loggerSuccess('[DB] SUCCESS!')
  } catch (error) {
    loggerError(`[SERVER ERROR]: ${error}`)
  }
}

db()

export const server = app.listen(app.get<number>('port'), () => {
  loggerInfo(`[SERVER RUNNING] listening on port ${app.get('port')}`)
})

export const serverTerminator = createHttpTerminator({
  server
})

import { app } from './app'
import { loggerError, loggerInfo } from './utils/logger'

export const server = app.listen(app.get('port'), () => {
  loggerInfo(`[SERVER RUNNING] listening on port ${app.get('port')}`)
})

server.on('error', (error) => {
  loggerError(`[SERVER ERROR] ${error}`)
  process.exit(1)
})

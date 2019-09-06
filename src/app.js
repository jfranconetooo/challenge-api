import server from './server'
import config from '../configs'
import log4js from 'log4js'
log4js.configure({
  appenders: { 'out': { type: 'stdout' } },
  categories: { default: { appenders: ['out'], level: 'info' } }
});
const log = log4js.getLogger('app')

const {
    port: PORT,
    env: NODE_ENV
} = config.api

server().then(app => {

    app.listen(PORT, () => {
        log.info(`Server listening on ${PORT} in ${NODE_ENV} environment`)
    })
}, err => {
    log.error('Error while starting up server', err)
    process.exit(1)
})
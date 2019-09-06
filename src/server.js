import Koa from 'koa'
import koaRouter from 'koa-router'
import cors from '@koa/cors'
import logRequests from './middlewares/log-request'
import error from './middlewares/error'
import routes from './routes'
import log4js from 'log4js'
import koaBody from 'koa-body'

const log = log4js.getLogger('server')

export default async () => {
    log.info('Creating server...')

    const config = await init()
   
    config.app.use(config.router.routes())

    return config.app
}

async function init(){
    const app = new Koa()
    const router = koaRouter()
    app.use(logRequests)
    app.use(cors())
    app.use(error)
    app.use(koaBody())
    routes('/api', router)

    return {
        app,
        router
    }
}
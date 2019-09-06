import messages from '../utils/error-messages'
import log4js from 'log4js'
const log = log4js.getLogger('error')

export default async function (ctx, next) {
    try {
        await next()
    } catch (err) {
        log.error(err)
        let response = messages[err.message] || messages['DEFAULT']
        response.body.details = err.message + ' - ' + JSON.stringify(err)

        ctx = Object.assign(ctx, response)
    }
}

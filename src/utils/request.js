import axios from 'axios'
import config from '../../configs'
import log4js from 'log4js'
const log = log4js.getLogger('request')
axios.defaults.baseURL = config.github.host;

export default async (params) => {
    try {
        const response = await axios(params)
        return response
    } catch (err) {
        log.error(err.message)
        switch (err.response.status) {
            case 403:
                throw new Error('ERROR:FORBIDDEN')
            case 404:
                throw new Error('ERROR:NOT_FOUND')
            default:
                throw new Error('ERROR:DEFAULT')

        }
    }
}

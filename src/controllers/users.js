import log4js from 'log4js'
import axios from 'axios'
import config from '../../configs'
import parse from 'parse-link-header'
import { get } from 'lodash'

const log = log4js.getLogger('users')

const list = async (ctx) => {
    log.info('Enter in list')
    const {
        page,
        per_page,
        since
    } = ctx.request.query

    const response = await axios({
        method: 'GET',
        url: `${config.github.host}/users?page=${page}&per_page=${per_page}&since=${since}`
    })

    const {
        link
    } = response.headers
    const parsed = parse(link)

    ctx.body = {
        docs: response.data,
        next: get(parsed, 'next.url', '')
    }
}

const show = async (ctx) => {
    log.info('Enter in show')

    const {
        username
    } = ctx.params

    const response = await axios({
        method: 'GET',
        url: `${config.github.host}/users/${username}`
    })

    ctx.body = response.data
}

const listRepos = async (ctx) => {
    log.info('Enter in listRepos')

    const {
        username
    } = ctx.params

    const response = await axios({
        method: 'GET',
        url: `${config.github.host}/users/${username}/repos`
    })

    ctx.body = response.data
}

export {
    list,
    show,
    listRepos
}

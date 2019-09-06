import {
    get
} from 'lodash'

const limit_per_page = process.env.DEFAULT_PAGE_SIZE || 10
const maxLimit_per_page = process.env.MAX_PAGE_SIZE || 20

const paginate = function (options = {}) {
    const _limit = (typeof options.limit === 'number') ? parseInt(options.limit, 10) : limit_per_page
    const _maxLimit = (typeof options.maxLimit === 'number') ? parseInt(options.maxLimit, 10) : maxLimit_per_page

    return async (ctx, next) => {
        ctx.request.query.page = parseInt(get(ctx.request.query, 'page', 0))
        ctx.request.query.per_page = parseInt(get(ctx.request.query, 'per_page', _limit))

        if (ctx.request.query.per_page > _maxLimit) ctx.request.query.per_page = _maxLimit

        if (ctx.request.query.page < 0) ctx.request.query.page = 0

        await next()
    }
}

export default paginate

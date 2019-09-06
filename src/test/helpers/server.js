import agent from 'supertest'
import http from 'http'
import memoize from 'lodash/memoize'

import server from 'server'

let _app, _server
const testServer = memoize(async () => {
    const app = _app = await server()
    _server = http.createServer(
        app.callback()
    )

    await new Promise(
        (resolve, reject) => _server.listen(0, (err) => err ? reject(err) : resolve())
    )

    const req = agent(
        _server
    )

    req.app = app
    return req
})

before(() => {
    return testServer()
})

after((done) => {
    if (_app) {
        _server.close(done)
    }
})

export default testServer

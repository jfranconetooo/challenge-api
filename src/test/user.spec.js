import server from 'helpers/server'
import nock from 'nock'

describe('## User controller',  () => {
    let request
    before(async () => {
        request = await server()
    })

    it('Get list of users', async () => {
        const since = 2 
        const page = 0 
        const per_page = 2
        nock('https://api.github.com')
            .get(`/users?page=${page}&per_page=${per_page}&since=${since}`)
            .replyWithFile(200, `${__dirname}/expected/users.json`, {
                'Content-Type': 'application/json'
            })
    
        const res = await request.get(`/api/users?page=${page}&per_page=${per_page}&since=${since}`)
            .expect(200)
            .expect('Content-Type', /json/)
        
            expect(res.body).to.be.an('object')
            expect(res.body.docs).to.be.an('array')
    })

    it('Get a single user detail', async () => {
        const username = 'JFrancoNeto'
        nock('https://api.github.com')
            .get(`/users/${username}`)
            .replyWithFile(200, `${__dirname}/expected/user.json`, {
                'Content-Type': 'application/json'
            })

        const res = await request.get(`/api/users/${username}/details`)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(res.body).to.be.an('object')
        expect(res.body.login).to.be.equal(username)
    })

    it('List all user`s repos', async () => {
        const username = 'JFrancoNeto'
        nock('https://api.github.com')
            .get(`/users/${username}/repos`)
            .replyWithFile(200, `${__dirname}/expected/user-repos.json`, {
                'Content-Type': 'application/json'
            })

        const res = await request.get(`/api/users/${username}/repos`)
            .expect(200)
            .expect('Content-Type', /json/)

        expect(res.body).to.be.an('array')
    })
})

import dotenv from 'dotenv'
dotenv.config()

const config = {
    node_env: process.env.NODE_ENV,
    api: {
        env: process.env.NODE_ENV,
        port: process.env.PORT || process.env.API_PORT,
        host: process.env.API_HOST
    },
    github: {
        host: process.env.GITHUB_HOST
    }
}

export default config
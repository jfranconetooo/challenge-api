import controllers from '../controllers'
import paginate from '../middlewares/paginate'
const {
  users
} = controllers

export default (basePath = '/api', router) => {
  router.get('/', ctx => ctx.body = 'Server is Running!')
  /*
    Users routes
  */
  router.get(`${basePath}/users`, paginate(), users.list)
  router.get(`${basePath}/users/:username/details`, users.show)
  router.get(`${basePath}/users/:username/repos`, users.listRepos)
}

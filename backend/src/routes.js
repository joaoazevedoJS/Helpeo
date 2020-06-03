const { Router } = require("express")

const routes = Router()

const Authorization = require('./middlewares/Authorization')

const ItemsController = require('./Controllers/ItemsController')
const PointsController = require('./Controllers/PointsController')
const AuthController = require('./Controllers/AuthController')
const UsersController = require('./Controllers/UsersController')

routes.post('/signup', AuthController.signUp)
routes.post('/signin', AuthController.signIn)

routes.get('/items', ItemsController.index)

routes.get('/points', PointsController.index)
routes.get('/points/:id', PointsController.show)

// Rotas que precisam de autorização

routes.use(Authorization)

routes.post('/user/points', UsersController.create)
routes.get('/user/points', UsersController.index)
routes.put('/user/point/:id', UsersController.update)
routes.delete('/user/point/:id', UsersController.delete)

module.exports = routes

const { Router } = require("express")
const multer = require('multer')
const multerConfig = require('./configs/multer')

const routes = Router()
const upload = multer(multerConfig)

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

routes.use('/user', Authorization)

routes.get('/user/authenticated', (req, res) => { res.send('') })
routes.get('/user', UsersController.show)

routes.post('/user/points', upload.single('image'), UsersController.create)
routes.get('/user/points', UsersController.index)
routes.put('/user/point/:id', upload.single('image'), UsersController.update)
routes.delete('/user/point/:id', UsersController.delete)

module.exports = routes

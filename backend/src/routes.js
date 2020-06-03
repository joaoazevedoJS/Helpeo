const { Router } = require("express")

const routes = Router()

const ItemsController = require('./Controllers/ItemsController')
const PointsController = require('./Controllers/PointsController')

routes.get('/items', ItemsController.index)

routes.get('/points', PointsController.index)
routes.get('/points/:id', PointsController.show)
routes.post('/points', PointsController.create)

module.exports = routes

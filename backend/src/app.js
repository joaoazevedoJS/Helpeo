const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()

const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(routes)

routes.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

module.exports = app

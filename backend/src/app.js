const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config({ path: path.resolve(__dirname, '..', '.host.env') })

const app = express()

const routes = require('./routes')

app.use(cors())
app.use(express.json())
app.use(routes)

routes.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

module.exports = app

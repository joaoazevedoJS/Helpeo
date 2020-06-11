const knex = require("knex")
const { test, development} = require('../../knexfile')

const config = process.env.NODE_ENV === 'test' ? test : development

const connection = knex(config)

module.exports = connection

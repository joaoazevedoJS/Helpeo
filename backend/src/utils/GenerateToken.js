const jwt = require('jsonwebtoken')
const { hash } = require('../configs/auth.json')

function GenerateToken(id) {
  const token = jwt.sign({ id }, hash, {
    expiresIn: 86400
  })

  return token
}

module.exports = GenerateToken

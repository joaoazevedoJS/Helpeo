const jwt = require('jsonwebtoken')

const knex = require('../database/connection')
const { hash } = require('../configs/auth.json')

function Authorization(req, res, next) {
  const auth = req.headers.authorization

  if(!auth) return res.status(401).json({ error: "No Token Provided" })

  // Formato do token: Bearer sajidshgo23ugfewih

  const parts = auth.split(' ')

  if(parts.length !== 2) return res.status(401).json({ error: "Token error" })

  const [ schema, token ] = parts

  if(!/^Bearer$/i.test(schema)) return res.status(401).json({ error: "Token Malformatedd" })

  jwt.verify(token, hash, async (err, decoded) => {
    if(err) return res.status(401).json({ error: "Invalid Token" })

    const id = decoded.id

    const user = await knex('users').where('id', id).first()

    if(!user) return res.status(404).json({ error: "User not found" })

    req.userId = { user_id: id}

    return next()
  })
}

module.exports = Authorization

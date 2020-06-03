const bcrypt = require('bcryptjs')

const knex = require("../database/connection")
const GenerateToken = require('../utils/GenerateToken')

module.exports = {
  async signUp(req, res) {
    const { name, email, password } = req.body

    const mailExists = await knex('users')
      .where('email', String(email))
      .first()

    if(mailExists) return res.status(409).json({ error: "Email Exists, try again!" })

    try {
      const hash = await bcrypt.hash(password, 10)

      const user = {
        name,
        email,
        password: hash
      }

      const [id] = await knex('users').insert(user)

      user.password = undefined

      return res.status(200).json({ id, ...user })
    } catch(e) {
      return res.status(406).json({ error: "Failed to register new user!" })
    }
  },

  async signIn(req, res) {
    const { email, password } = req.body

    const user = await knex('users').where('email', email).first()

    if(!user) return res.status(404).json({ error: "User not Found" })

    const verifyPassword = await bcrypt.compare(password, user.password)

    if(!verifyPassword) return res.status(401).json({ error: "Invalid password. try again!" })

    user.password = undefined

    const token = GenerateToken(user.id)

    return res.json({ ...user, token })
  }
}

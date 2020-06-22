const knex = require("../database/connection")

module.exports = {
  async index(req, res) {
    const items = await knex("items").select('*')

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://${process.env.HOST}:3333/uploads/icons/${item.image}`
      }
    })

    return res.json(serializedItems)
  }
}

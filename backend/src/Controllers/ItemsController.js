const knex = require("../database/connection")

module.exports = {
  async index(req, res) {
    const items = await knex("items").select('*')

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://localhost:3333/uploads/${item.image}`
      }
    })

    return res.json(serializedItems)
  }
}

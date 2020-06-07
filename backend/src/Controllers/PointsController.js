const knex = require("../database/connection")
const Serialized = require('../utils/Serialized')

module.exports = {
  async index(req, res) {
    const { city, uf, items } = req.query

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()))

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct() // para retonar pontos diferentes
      .select('points.*')

    const serializedPoint = Serialized(points, 'points')

    return res.json(serializedPoint)
  },

  async show(req, res) {
    const { id } = req.params

    const point = await knex('points').where('id', id).first()

    if (!point) {
      return res.status(400).json({ error: 'Point not Found' })
    }

    const serializedPoints =  {
      ...point,
      image_url: `http://localhost:3333/uploads/points/${point.image}`
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title')

    return res.json({
      point: serializedPoints,
      items
    })
  },
}

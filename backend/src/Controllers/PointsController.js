const knex = require("../database/connection")

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

    return res.json(points)
  },

  async show(req, res) {
    const { id } = req.params

    const point = await knex('points').where('id', id).first()

    if (!point) {
      return res.status(400).json({ error: 'Point not Found' })
    }

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('items.title')

    return res.json({
      point,
      items
    })
  },

  async create(req, res) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      numbering,
      items
    } = req.body

    const trx = await knex.transaction()

    const image = 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'

    const point = {
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      numbering
    }

    const insertedIds = await trx('points').insert(point)
    const point_id = insertedIds[0]

    const pointItems = items.map(item_id => {
      return {
        item_id,
        point_id,
      }
    })

    await trx('point_items').insert(pointItems)

    await trx.commit()

    return res.json({
      id: point_id,
      ...point
    })
  }
}

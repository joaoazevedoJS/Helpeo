const knex = require('../database/connection')

module.exports = {
  async index(req, res) {
    const { user_id } = req.userId

    const points = await knex('points').where('user_id', user_id)

    return res.json(points)
  },

  async show(req, res) {
    const { user_id } = req.userId

    const user = await knex('users')
      .where('id', user_id).first()
      .select('id')
      .select('name')
      .select('email')

    if(!user) return res.status(404).json({ error: "User not Found" })

    return res.json(user)

  },

  async create(req, res) {
    const { user_id } = req.userId

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
      numbering,
      user_id
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
  },

  async update(req, res) {
    const { user_id } = req.userId
    const { id } = req.params

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

    const point = await knex('points')
      .where('id', id)
      .where('user_id', user_id)
      .first()

    if (!point) return res.status(404).json({ error: "Point not Found!" })

    const updateTo = {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      numbering,
    }

    const trx = await knex.transaction()

    await trx('points')
      .where('id', id)
      .where('user_id', user_id)
      .update(updateTo)

    const pointItems = items.map(item_id => {
      return {
        item_id,
        point_id: id
      }
    })

    await trx('point_items')
      .where('point_id', id)
      .delete()

    await trx('point_items').insert(pointItems)

    await trx.commit()

    return res.json(updateTo)
  },

  async delete(req, res) {
    const { user_id } = req.userId
    const { id } = req.params

    const point = await knex('points')
      .where('id', id)
      .where('user_id', user_id)
      .first()

    if (!point) return res.status(404).json({ error: "Point not Found!" })

    const trx = await knex.transaction()

    await trx('point_items')
      .where('point_id', id)
      .delete()

    await trx('points')
      .where('id', id)
      .where('user_id', user_id)
      .first()
      .delete()

    await trx.commit()

    return res.status(200).send('')
  }
}

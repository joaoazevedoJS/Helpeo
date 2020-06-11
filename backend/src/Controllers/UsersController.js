const knex = require('../database/connection')
const Serialized = require('../utils/Serialized')

module.exports = {
  async index(req, res) {
    const { user_id } = req.userId

    const points = await knex('points').where('user_id', user_id)

    const serializedPoint = Serialized(points, 'points')

    return res.json(serializedPoint)
  },

  async show(req, res) {
    const { user_id } = req.userId

    const user = await knex('users')
      .where('id', user_id).first()
      .select('id')
      .select('name')
      .select('email')

    if (!user) return res.status(404).json({ error: "User not Found" })

    return res.json(user)

  },

  async create(req, res) {
    const { user_id } = req.userId

    const {
      title,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      address,
      neighborhood,
      numbering,
      items
    } = req.body

    const trx = await knex.transaction()

    const user = await trx('users')
      .where('id', user_id).first()
      .select('email')

    if (!user) return res.status(404).json({ error: "User not Found" })

    const { email } = user

    const image = process.env.NODE_ENV === 'test' ? 'shop.jpg' : req.file.filename

    const point = {
      image,
      title,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      address,
      neighborhood,
      numbering,
      user_id
    }

    const insertedIds = await trx('points').insert(point)

    const point_id = insertedIds[0]

    const pointItems = items.split(',')
      .map(item => Number(item.trim()))
      .map(item_id => {
        return {
          item_id,
          point_id,
        }
      })

    await trx('point_items').insert(pointItems)

    await trx.commit()

    const data = { id: point_id, ...point }

    return res.json(data)
  },

  async update(req, res) {
    const { user_id } = req.userId
    const { id } = req.params

    const {
      title,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      address,
      neighborhood,
      numbering,
      items
    } = req.body

    const point = await knex('points')
      .where('id', id)
      .where('user_id', user_id)
      .first()

    if (!point) return res.status(404).json({ error: "Point not Found!" })

    const image = process.env.NODE_ENV === 'test' ? 'shop.jpg' : req.file.filename

    const updateTo = {
      image,
      title,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      address,
      neighborhood,
      numbering,
    }

    const trx = await knex.transaction()

    await trx('points')
      .where('id', id)
      .where('user_id', user_id)
      .update(updateTo)

    const pointItems = items.split(',')
      .map(item => Number(item.trim()))
      .map(item_id => {
        return {
          item_id,
          point_id: id,
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

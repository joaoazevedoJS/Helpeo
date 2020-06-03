exports.up = async function(knex) {
  return knex.schema.createTable('points', table => {
    table.increments('id').primary();
    table.string('image').notNullable()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('whatsapp').notNullable()
    table.decimal('latitude').notNullable()
    table.decimal('longitude').notNullable()
    table.string('city').notNullable()
    table.integer('numbering').notNullable()
    table.string('uf', 2).notNullable()
  })
}

exports.down = async function(knex) {
  return knex.scheme.dropTable('point')
}

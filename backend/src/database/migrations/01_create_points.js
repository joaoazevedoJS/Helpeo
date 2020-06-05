exports.up = async function(knex) {
  return knex.schema.createTable('points', table => {
    table.increments('id').primary();
    table.string('image').notNullable()
    table.string('title').notNullable()
    table.string('email').notNullable()
    table.string('whatsapp').notNullable()
    table.decimal('latitude').notNullable()
    table.decimal('longitude').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable()
    table.string('address').notNullable()
    table.string('neighborhood').notNullable()
    table.integer('numbering').notNullable()
    table.integer('user_id').notNullable()
    .references('id')
    .inTable('items');
  })
}

exports.down = async function(knex) {
  return knex.scheme.dropTable('point')
}

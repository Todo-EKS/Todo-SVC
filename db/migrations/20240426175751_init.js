/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('koa_todo', table => {
    // table.increments();
    table.string('id').notNullable().primary().unique();
    table.string('user_id').notNullable();
    table.string('title').notNullable();
    table.boolean('completed').defaultTo(false);
    table.timestamp('created_at').notNullable();
    table.string('target_date').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('koa_todo');
};

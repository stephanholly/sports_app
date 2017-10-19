
exports.up = function(knex, Promise) {
  return knex.schema.createTable('atendee_events', function(table) {
    table.increments();
    table.integer('user_id');
    table.integer('event_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('atendee_events');
};

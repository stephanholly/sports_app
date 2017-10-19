
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(table) {
    table.increments();
    table.string('title');
    table.string('location');
    table.date('date');
    table.time('time');
    table.string('type');
    table.integer('host_id');
    table.string('description');
    table.boolean('private');
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events')
};

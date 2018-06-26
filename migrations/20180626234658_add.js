
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones', function(table){
      table.increments('id').unsigned().primary();
      table.string('description').notNull();
      table.dateTime('date_achieved').notNull();
      table.integer('famous_person_id').unsigned().references('id').inTable('famous_people');
      table.timestamps();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ])
};
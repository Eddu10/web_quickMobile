'use strict';
 
const helper = require('../src/shared/helperMigration');
//comentario
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('order', (table) => {
        table.increments().primary();
        table.text('description').notNullable;
        table.date('date').notNullable();
        table.double('price').notNullable();
        table.text('observation');
        table.integer('user_id').notNullable;
        table.foreign('user_id').references('id').inTable('user');
        helper.defaultColumns(table, false);
    })
};
 
exports.down = function(knex) {
    return knex.schema.dropTable('order');
};

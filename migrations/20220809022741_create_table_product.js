'use strict';
 
const helper = require('../src/shared/helperMigration');
//comentario
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('product', (table) => {
        table.increments().primary();
        table.string('name').notNullable;
        table.text('description').notNullable;
        table.double('price').notNullable();
        table.text('image').notNullable();
        helper.defaultColumns(table, false);
    })
};
 
exports.down = function(knex) {
    return knex.schema.dropTable('product');
};

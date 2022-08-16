'use strict';
 
const helper = require('../src/shared/helperMigration');

exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('user', (table) => {
        table.increments('id').primary();
        table.string('username',12).unique().notNullable();
        table.string('password',124).notNullable();
        table.string('email',50);
        table.string('phone_number',10);
        helper.defaultColumns(table);
    })
};
 
exports.down = function(knex) {
    return knex.schema.dropTable('user');
};

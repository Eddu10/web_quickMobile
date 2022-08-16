'use strict';

const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('./../../knexfile');

let knex = null;

function initConnection() {
	knex = Knex(knexConfig);
	Model.knex(knex);
}

function closeConnection(close = true) {
	if (close) {
		knex.destroy();
	}
}

const methods = {
	initConnection,
	closeConnection,
};

module.exports = methods;

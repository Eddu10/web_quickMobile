'use strict';

const Boom = require('@hapi/boom');
const Product = require('../../../models/Product');

async function handler(request) {
	try {
		const list = await Product.getAll(request.query);
		return list;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;

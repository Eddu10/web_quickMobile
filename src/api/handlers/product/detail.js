'use strict';

const Boom = require('@hapi/boom');
const Product = require('../../../models/Product');

async function handler(request) {
	try {
		const { id } = request.params;
		const product = await Product.getById(id);
		return product;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;

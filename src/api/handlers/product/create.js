'use strict';

const Boom = require('@hapi/boom');
const Product = require('../../../models/Product');

async function handler(request, h) {
	try {
		var newProduct = null;
		var data = request.payload;

		newProduct = await Product.create(data);

		if (newProduct) {
			return h.response(newProduct).code(201);
		}
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;

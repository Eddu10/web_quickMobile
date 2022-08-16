'use strict';

const Boom = require('@hapi/boom');
const Product = require('../../../models/Product');

async function handler(request, h) {
	try {
		const { id } = request.params;
		await Product.removeById(id);
		return 'SUCCESSFULLY DELETED';
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;

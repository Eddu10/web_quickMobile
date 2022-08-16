'use strict';

const Boom = require('@hapi/boom');
const Order = require('../../../models/Order');

async function handler(request, h) {
	try {
		const { id } = request.params;
		await Order.removeById(id);
		return 'SUCCESSFULLY DELETED';
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;

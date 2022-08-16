'use strict';

const Boom = require('@hapi/boom');
const Order = require('../../../models/Order');

async function handler(request) {
	try {
		const { id } = request.params;
		const order = await Order.getById(id);
		return order;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;

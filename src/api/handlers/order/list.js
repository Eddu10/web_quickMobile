'use strict';

const Boom = require('@hapi/boom');
const Order = require('../../../models/Order');

async function handler(request) {
	try {
		const list = await Order.getAll(request.query);
		return list;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;

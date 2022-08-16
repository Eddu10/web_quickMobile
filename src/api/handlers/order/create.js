'use strict';

const Boom = require('@hapi/boom');
const Order = require('../../../models/Order');

const saltRounds = process.env.SALT_ROUNDS || 10;

async function handler(request, h) {
	try {
		var newOrder = null;
		var data = request.payload;

		newOrder = await Order.create(data);

		if (newOrder) {
			return h.response(newOrder).code(201);
		}
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;

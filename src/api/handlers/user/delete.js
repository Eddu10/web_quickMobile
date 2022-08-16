'use strict';

const Boom = require('@hapi/boom');
const User = require('../../../models/User');

async function handler(request, h) {
	try {
		const { id } = request.params;
		await User.removeById(id);

		return h.response().code(204);
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;

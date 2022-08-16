'use strict';

const Boom = require('@hapi/boom');
const User = require('../../../models/User');

async function handler(request) {
	try {
		const list = await User.getAll(request.query);
		return list;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;

'use strict';

const Boom = require('@hapi/boom');
const User = require('../../../models/User');

async function handler(request) {
	try {
		const { id } = request.params;
		const user = await User.getById(id);
		delete user.password;
		return user;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;

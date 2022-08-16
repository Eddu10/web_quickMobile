'use strict';

const Boom = require('@hapi/boom');
const Bcrypt = require('bcrypt');
const User = require('../../../models/User');

const saltRounds = process.env.SALT_ROUNDS || 10;

async function handler(request, h) {
	try {
		var newUser = null;
		var data = request.payload;

		// Hash password
		const hashedPasswd = await Bcrypt.hash(data.password, saltRounds);

		// Override password, delete password confirmation and create user
		data.password = hashedPasswd;
		delete data.confirmPassword;
		newUser = await User.create(data);

		if (newUser) {
			delete newUser.password;
			return h.response(newUser).code(201);
		}
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

module.exports = handler;

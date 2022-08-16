'use strict';

const Boom = require('@hapi/boom');
const { func } = require('joi');
const User = require('../../models/User');

const { userNotFound, existingUsername } = require('../shared/error_codes');

async function validateById(request) {
	try {
		const { id } = request.params;
		const users = await User.getById(id);
		return users || Boom.badRequest(userNotFound);
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

async function validateByUsername(request) {
	try {
		const { username } = request.payload;
		const id = await User.findByUsername(username);

		if (id) {
			return Boom.badRequest(existingUsername);
		}

		return true;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

const pre = {
	validateById,
	validateByUsername,
};

module.exports = pre;

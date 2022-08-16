'use strict';

const Boom = require('@hapi/boom');
const Bcrypt = require('bcrypt');
const User = require('../models/User');

// Simple auth
const validateSimple = async (request, username, password) => {
	try {
		const user = await User.findByUsername(username);
		if (!user) {
			return Promise.reject(
				Boom.badRequest('There is no user with the given username'),
			);
		}

		const isValid = await Bcrypt.compare(password, user.password);
		const credentials = {
			id: user.id,
			name: user.username,
			group: user.group,
		};
		return { isValid, credentials };
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
};

const validateJwt = {
	keys: 'iu1S04Jz1T$^e1rg49&Hf1&FnM$*ViufCNsV%mMIx^NH6rC496',
	verify: {
		aud: false,
		iss: false,
		sub: false,
		nbf: true,
		exp: true,
		maxAgeSec: 14400,
		timeSkewSec: 15,
	},
	validate: (artifacts, request, h) => {
		return {
			isValid: true,
			credentials: { group: artifacts.decoded.payload.group },
		};
	},
};

module.exports = {
	validateSimple,
	validateJwt,
};

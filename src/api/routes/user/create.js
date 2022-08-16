'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/user/create');
//const pre = require('../../pre/user');

const resultModel = Joi.object({
	username: Joi.string(),
	email: Joi.string(),
	phone_number: Joi.string(),
	deletedAt: Joi.string(),
	flagActive: Joi.boolean(),
	createdAt: Joi.string(),
	updatedAt: Joi.string(),
	id: Joi.number(),
}).label('Created User');

const unauthorizedModel = Joi.object({
	statusCode: Joi.number(),
	error: Joi.string(),
	message: Joi.string(),
	attributes: Joi.object({
		error: Joi.string(),
	}).optional(),
}).label('Unauthorized');

const badRequestModel = Joi.object({
	statusCode: Joi.number(),
	error: Joi.string(),
	message: Joi.string(),
	validation: Joi.object({
		source: Joi.string(),
		keys: Joi.array(),
	}).optional(),
}).label('Validation Bad Request');

const errorModel = Joi.object({
	statusCode: Joi.number(),
	error: Joi.string(),
	message: Joi.string(),
}).label('Error');

const resultHTTPStatus = {
	201: {
		description: 'Success',
		schema: resultModel,
	},
	400: {
		description: 'Bad Request',
		schema: badRequestModel,
	},
	401: {
		description: 'Unauthorized',
		schema: unauthorizedModel,
	},
	500: {
		description: 'Internal Server Error',
		schema: errorModel,
	},
};

const route = {
	handler,
	method: 'POST',
	path: '/',
	options: {
		description: 'Create user',
		notes: 'Create a user and return the created object',
		tags: ['api'],
		plugins: {
			'hapi-swagger': {
				responses: resultHTTPStatus,
				payloadType: 'form',
			},
		},
		// pre: [
		// 	{
		// 		method: pre.validateByUsername,
		// 	},
		// ],
		validate: {
			failAction,
			payload: Joi.object({
				username: Joi.string().required().max(12),
				password: Joi.string().required().max(24),
				confirmPassword: Joi.string()
					.valid(Joi.ref('password'))
					.meta({ disableDropdown: true }),
				email: Joi.string()
					.email({ tlds: { allow: false } })
					.required(),
				group: Joi.string(),
			}).with('password', 'confirmPassword'),
		},
	},
};

module.exports = route;

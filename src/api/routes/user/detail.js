'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/user/detail');
//const pre = require('../../pre/user');

const resultModel = Joi.object({
	id: Joi.number(),
	username: Joi.string(),
	email: Joi.string(),
	phone_number: Joi.string(),
	flagActive: Joi.boolean(),
	deletedAt: Joi.string(),
	createdAt: Joi.string(),
	updatedAt: Joi.string(),
}).label('User Detail');

const unauthorizedModel = Joi.object({
	statusCode: Joi.number(),
	error: Joi.string(),
	message: Joi.string(),
	attributes: Joi.object({
		error: Joi.string(),
	}).optional(),
}).label('Unauthorized');

const errorModel = Joi.object({
	statusCode: Joi.number(),
	error: Joi.string(),
	message: Joi.string(),
}).label('Error');

const resultHTTPStatus = {
	200: {
		description: 'Success',
		schema: resultModel,
	},
	400: {
		description: 'Bad Request',
		schema: errorModel,
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
	method: 'GET',
	path: '/{id}',
	options: {
		description: 'Detail user',
		notes: 'Returns the detail of a user',
		plugins: {
			'hapi-swagger': {
				responses: resultHTTPStatus,
			},
		},
		tags: ['api'],
		// pre: [
		// 	{
		// 		method: pre.validateById,
		// 	},
		// ],
		validate: {
			failAction,
			params: Joi.object({
				id: Joi.number().required(),
			}),
		},
	},
};

module.exports = route;

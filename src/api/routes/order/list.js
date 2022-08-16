'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/order/list');

const resultModel = Joi.array()
	.items(
		Joi.object({
			id: Joi.number(),
			description: Joi.string(),
			date: Joi.date(),
			price: Joi.number(),
			observation: Joi.string(),
			user_id: Joi.number(),
		}).label('Order'),
	)
	.label('Order');

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
	path: '/',
	options: {
		description: 'List order',
		notes: 'Returns a list of an orders',
		plugins: {
			'hapi-swagger': {
				responses: resultHTTPStatus,
			},
		},
		tags: ['api'],
		validate: {
			failAction,
			query: Joi.object({
				description: Joi.string(),
				date: Joi.date(),
				price: Joi.number(),
			}),
		},
	},
};

module.exports = route;

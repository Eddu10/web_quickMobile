'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/product/list');

const resultModel = Joi.array()
	.items(
		Joi.object({
			id: Joi.number(),
			name: Joi.string(),
			description: Joi.string(),
			price: Joi.number(),
			image: Joi.string(),
		}).label('Product'),
	)
	.label('Product');

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
		description: 'List Poduct',
		notes: 'Returns a list of a products',
		plugins: {
			'hapi-swagger': {
				responses: resultHTTPStatus,
			},
		},
		tags: ['api'],
		validate: {
			failAction,
			query: Joi.object({
				name: Joi.string(),
				description: Joi.string(),
				price: Joi.number(),
			}),
		},
	},
};

module.exports = route;

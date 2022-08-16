'use strict';

const Joi = require('joi');
const { failAction } = require('../../shared/httpHelper');
const handler = require('../../handlers/order/create');
//const pre = require('../../pre/order');

const resultModel = Joi.object({
	description: Joi.string(),
	date: Joi.date(),
	price: Joi.number(),
	observation: Joi.string(),
	user_id: Joi.number(),
	deletedAt: Joi.string(),
	flagActive: Joi.boolean(),
	createdAt: Joi.string(),
	updatedAt: Joi.string(),
	id: Joi.number(),
}).label('Created Order');

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
		description: 'Create order',
		notes: 'Create an order and return the created object',
		tags: ['api'],
		plugins: {
			'hapi-swagger': {
				responses: resultHTTPStatus,
				payloadType: 'form',
			},
		},
		// pre: [
		// 	{
		// 		method: pre.validateByNumber,
		// 	},
		// 	{
		// 		method: pre.validationByCompanyId,
		// 	},
		// ],
		validate: {
			failAction,
			payload: Joi.object({
				description: Joi.string().required(),
				date: Joi.date().required(),
				price: Joi.number().required(),
				user_id: Joi.number().required(),
			}),
		},
	},
};

module.exports = route;

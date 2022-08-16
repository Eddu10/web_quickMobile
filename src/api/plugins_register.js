'use strict';

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const usersRoute = require('./plugins/user');
const orderRoute = require('./plugins/order');
const productRoute = require('./plugins/product');

const swaggerOptions = {
	info: {
		title: 'Hapi Template API Documentation',
		description: 'This is a sample example of API documentation.',
	},
	securityDefinitions: {
		jwt: {
			type: 'apiKey',
			name: 'Authorization',
			in: 'header',
			'hapiSwagger.keyPrefix': 'Bearer ',
		},
	},
	security: [{ jwt: [] }],
};

const plugins = [
	Inert,
	Vision,
	{
		plugin: HapiSwagger,
		options: swaggerOptions,
	},
	{
		plugin: usersRoute,
		routes: {
			prefix: '/user',
		},
	},
	{
		plugin: orderRoute,
		routes: {
			prefix: '/order',
		},
	},
	{
		plugin: productRoute,
		routes: {
			prefix: '/product',
		},
	},
];

module.exports = plugins;

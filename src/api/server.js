'use strict';

const Hapi = require('@hapi/hapi');
const plugins = require('./plugins_register');
const objection = require('../config/objection');
const authMethods = require('./auth_methods');

// Set host and port for service
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 7777;

// Create the server
const server = new Hapi.Server({
	host: host,
	port: port,
});

exports.init = async () => {
	//Initialize DB
	objection.initConnection();

	// Simple Auth
	await server.register(require('@hapi/basic'));
	// server.auth.strategy('simple', 'basic', {
	// 	validate: authMethods.validateSimple,
	// });

	// JWT Auth
	await server.register(require('@hapi/jwt'));
	server.auth.strategy('jwt', 'jwt', authMethods.validateJwt);

	// Set the strategy
	// server.auth.default('jwt');

	// Register blipp in dev env
	if (process.env.NODE_ENV === 'development') {
		await server.register({
			plugin: require('blipp'),
			options: { showAuth: true },
		});
	}

	// Register all the plugins
	await server.register(plugins);
	await server.initialize();
	return server;
};

exports.start = async () => {
	// Start accepting requests
	await this.init();
	await server.start();
	console.log(`Server running at: ${server.info.uri}`);
	return server;
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

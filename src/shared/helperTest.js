'use strict';

const serverObj = require('./../api/server');

function createRouteTest(otherProperties = {}) {
	const route = {
		...otherProperties,
	};
	return route;
}

async function mockServer() {
	const server = await serverObj.start();
	return server;
}

const methods = {
	mockServer,
	createRouteTest,
};

module.exports = methods;

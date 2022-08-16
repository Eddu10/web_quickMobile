'use strict';

const test = require('tape');
const { mockServer } = require('../shared/helperTest');

test('start server', async (assert) => {
	global.serverTest = await mockServer();
	const route = {
		method: 'GET',
		url: '/',
	};
	const { statusCode } = await global.serverTest.inject(route);
	assert.plan(1);
	assert.equal(statusCode, 404, 'GET / must return 404 not found');
	assert.end();
});

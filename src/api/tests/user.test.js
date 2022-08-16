'use strict';

const test = require('tape');
const { createRouteTest } = require('../../shared/helperTest');

let userId;
let token;

test('/GET /user list users without authorization', async (assert) => {
	const route = {
		method: 'GET',
		url: '/user',
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 401;
	const message = 'GET /user should return a status code of 401';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/GET /login login with known user to get token', async (assert) => {
	const route = {
		method: 'GET',
		url: '/login',
		headers: { authorization: 'Basic am9zOnRlc3Q=' },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	// Asign token for further requests
	token = result.token;

	assert.plan(1);

	const actual = statusCode;
	const expected = 200;
	const message = 'GET /login should return a status code of 200';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /user creates a new user with wrong password confirmation', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			username: 'test',
			password: 'test',
			confirmPassword: 'test1',
			email: 'prueba@test.com',
			group: 'admin',
		},
		url: '/user',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'POST /user should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /user creates a new user with invalid email', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			username: 'test',
			password: 'test',
			confirmPassword: 'test1',
			email: 'prueba',
			group: 'admin',
		},
		url: '/user',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'POST /user should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /user creates a new user with duplicated user error', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			username: 'jos',
			password: 'test',
			confirmPassword: 'test',
			email: 'prueba@test.com',
			group: 'admin',
		},
		url: '/user',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'POST /user should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /user creates a new user', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			username: 'test',
			password: 'test',
			confirmPassword: 'test',
			email: 'prueba@test.com',
			group: 'user',
		},
		url: '/user',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	userId = result.id;

	assert.plan(1);

	const actual = statusCode;
	const expected = 201;
	const message = 'POST /user should return a status code of 201';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/GET /user brings the users list', async (assert) => {
	const route = {
		method: 'GET',
		url: '/user',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(2);

	const actual = statusCode;
	const expected = 200;
	const message = 'GET /user should return status code 200';

	assert.equal(actual, expected, message);

	const actualQuantity = Object.keys(result).length === 2;
	const expectedQuantity = true;
	const messageQuantity = 'GET /user must return 2 registers';

	assert.equal(actualQuantity, expectedQuantity, messageQuantity);

	assert.end();
});

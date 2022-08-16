'use strict';

const test = require('tape');
const { createRouteTest } = require('../../shared/helperTest');

let userId;
let token;

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

test('/POST /establishment creates a new establishment', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			number: '12',
			address: 'Latacunga',
			company_id: 1,
			company_name: 'Fenix',
			state: 'activo',
		},
		url: '/establishment',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 201;
	const message = 'POST /establishment should return a status code of 201';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /establishment creates a new establishment with duplicate number', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			number: '12',
			address: 'Latacunga',
			company_id: 1,
			company_name: 'Fenix',
			state: 'activo',
		},
		url: '/establishment',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'POST /establishment should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /establishment creates a new establishment with empty field number', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			number: '',
			address: 'Latacunga',
			company_Id: 1,
			company_name: 'Fenix',
			state: 'cerrado',
		},
		url: '/establishment',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'POST /establishment should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /establishment creates a new establishment with a non-existent company_id', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			number: '15',
			address: 'Latacunga',
			company_id: 12,
			company_name: 'Fenix',
			state: 'cerrado',
		},
		url: '/establishment',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	userId = result.id;

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'POST /establishment should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /establishment creates a new establishment with empty field company_id', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			number: '123',
			address: 'Latacunga',
			company_id: '',
			company_name: 'Fenix',
			state: 'cerrado',
		},
		url: '/establishment',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	userId = result.id;

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'POST /establishment should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/GET /establishment list establishments with wrong id parameter', async (assert) => {
	const route = {
		method: 'GET',
		url: '/establishment/15',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'GET /establishment should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/GET /establishment list establishments with empty id parameter', async (assert) => {
	const route = {
		method: 'GET',
		url: '/establishment/',
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 404;
	const message = 'GET /establishment should return a status code of 404';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/PATCH /establishment update an establishment', async (assert) => {
	const route = {
		method: 'PATCH',
		payload: {
			number: '23',
			address: 'Latacunga',
			company_name: 'Fenix',
			state: 'cerrado',
		},
		url: '/establishment/1',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 200;
	const message = 'PATCH /establishment should return status code 200';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/PATCH /establishment update an establishment with wrong id parameter', async (assert) => {
	const route = {
		method: 'PATCH',
		payload: {
			number: '24',
			address: 'Latacunga',
			company_name: 'Fenix',
			state: 'cerrado',
		},
		url: '/establishment/15',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'PATCH /establishment should return status code 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/PATCH /establishment update an establishment with empty id parameter', async (assert) => {
	const route = {
		method: 'PATCH',
		payload: {
			number: '25',
			address: 'Latacunga',
			company_name: 'Fenix',
			state: 'cerrado',
		},
		url: '/establishment/',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 404;
	const message = 'PATCH /establishment should return status code 404';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/PATCH /establishment update only one field in an establishment', async (assert) => {
	const route = {
		method: 'PATCH',
		payload: {
			address: 'Quito',
		},
		url: '/establishment/1',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 200;
	const message = 'PATCH /establishment should return status code 200';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/DELETE /establishment delete an establishment with wrong id parameter', async (assert) => {
	const route = {
		method: 'DELETE',
		url: '/establishment/15',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'DELETE /establishment should return status code 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/DELETE /establishment delete an establishment with empty id parameter', async (assert) => {
	const route = {
		method: 'DELETE',
		url: '/establishment/',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 404;
	const message = 'DELETE /establishment should return status code 404';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/DELETE /establishment delete an establishment', async (assert) => {
	const route = {
		method: 'DELETE',
		url: '/establishment/1',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 200;
	const message = 'DELETE /establishment should return status code 200';

	assert.equal(actual, expected, message);

	assert.end();
});

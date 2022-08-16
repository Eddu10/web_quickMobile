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

test('/POST /company creates a new company', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			id_number: 'tgrghh',
			company_name: 'test 1',
			trade_name: 'test 1',
			address: 'test adress',
			fiscal_position: 'test 1',
			account_obligated: 'test 1',
			logo: 'test 1',
			phone: 'test 1',
			email: 'prueba@gmail.com',
			description: 'test description',
			max_ammount: 78,
			enviroment: 'test 1',
			attempts_number: 13,
		},
		url: '/company',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 201;
	const message = 'POST /company should return a status code of 201';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /company creates a new company with repeated id_number', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			id_number: 'eyJhHGciOipIUztoxt5o1',
			company_name: 'test 1',
			trade_name: 'test 1',
			address: 'test adress',
			fiscal_position: 'test 1',
			account_obligated: 'test 1',
			logo: 'test 1',
			phone: 'test 1',
			email: 'prueba@test.com',
			description: 'test description',
			max_ammount: 'test 1',
			enviroment: 'test 1',
			attempts_number: 1,
		},
		url: '/company',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'POST /company should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /company creates a new company with invalid email', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			id_number: '01770452610o',
			company_name: 'test 1',
			trade_name: 'test 1',
			address: 'test adress',
			fiscal_position: 'test 1',
			account_obligated: 'test 1',
			logo: 'test 1',
			phone: 'test 1',
			email: 'prueba',
			description: 'test description',
			max_ammount: 'test 1',
			enviroment: 'test 1',
			attempts_number: 1,
		},
		url: '/company',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'POST /company should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/GET /company brings the companies list', async (assert) => {
	const route = {
		method: 'GET',
		url: '/company',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 200;
	const message = 'GET /company should return status code 200';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/GET /company  brings the company  id does not exist ', async (assert) => {
	const route = {
		method: 'GET',
		url: '/company/123',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'GET /company  should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/GET /company  brings the company  id empty', async (assert) => {
	const route = {
		method: 'GET',
		url: '/company/',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 404;
	const message = 'GET /company  should return a status code of 404';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/GET /company  successful company  query', async (assert) => {
	const route = {
		method: 'GET',
		url: '/company/1',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 200;
	const message = 'GET /company  should return a status code of 200';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/PATCH /company brings the company id does not exist', async (assert) => {
	const route = {
		method: 'PATCH',
		payload: {
			id_number: '01770452610o',
			company_name: 'test 1',
			trade_name: 'test 1',
			address: 'test adress',
			fiscal_position: 'test 1',
			account_obligated: 'test 1',
			logo: 'test 1',
			phone: 'test 1',
			email: 'prueba@gmail.com',
			description: 'test description',
			max_ammount: 'test 1',
			enviroment: 'test 1',
			attempts_number: 13,
		},
		url: '/company/143',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'PATCH /company  should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/PATCH /company brings the company id empty', async (assert) => {
	const route = {
		method: 'PATCH',
		payload: {
			id_number: '01770452610o',
			company_name: 'test 1',
			trade_name: 'test 1',
			address: 'test adress',
			fiscal_position: 'test 1',
			account_obligated: 'test 1',
			logo: 'test 1',
			phone: 'test 1',
			email: 'prueba@gmail.com',
			description: 'test description',
			max_ammount: 'test 1',
			enviroment: 'test 1',
			attempts_number: 13,
		},
		url: '/company/',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 404;
	const message = 'PATCH /company should return a status code of 404';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/PATCH /company creates a update company', async (assert) => {
	const route = {
		method: 'PATCH',
		payload: {
			id_number: '01770452610o',
			company_name: 'test 1',
			trade_name: 'test 145',
			address: 'test adress',
			fiscal_position: 'test 1',
			account_obligated: 'test 1',
			logo: 'test 1',
			phone: 'test 1',
			email: 'prueba@gmail.com',
			description: 'test description',
			max_ammount: 67,
			enviroment: 'test 1',
			attempts_number: 13,
		},
		url: '/company/1',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 200;
	const message = 'PATCH /company should return a status code of 200';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/DELETE /company brings the digital certificate id does not exist', async (assert) => {
	const route = {
		method: 'DELETE',
		url: '/company/434',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'DELETE /company should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/DELETE /company brings the company id empty', async (assert) => {
	const route = {
		method: 'DELETE',
		url: '/company/',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 404;
	const message = 'DELETE /company should return a status code of 404';

	assert.equal(actual, expected, message);

	assert.end();
});

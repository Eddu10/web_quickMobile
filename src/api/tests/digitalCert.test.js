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

test('/POST /digitalCert creates a new digital certificate', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			password: 'eyJhpGciOipIUztixt5o1',
			digital_cert: 'pruebas',
			company_id: 1,
		},
		url: '/digitalCert',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 201;
	const message = 'POST /digitalCert should return a status code of 201';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /digitalCert creates a digital certificate with invalid id_company', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			password: 'eyJhiGciOipIUztixt5o1',
			digital_cert: 'pruebas',
			company_id: 195,
		},
		url: '/digitalCert',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'POST /digitalCert should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /digitalCert creates a new digital certificate with password empty', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			password: '',
			digital_cert: 'pruebas',
			company_id: 1,
		},
		url: '/digitalCert',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'POST /digitalCert should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/GET /digitalCert brings the digitalCert list', async (assert) => {
	const route = {
		method: 'GET',
		url: '/digitalCert',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 200;
	const message = 'GET /digitalCert should return status code 200';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/GET /digitalCert brings the digital certificate id does not exist ', async (assert) => {
	const route = {
		method: 'GET',
		url: '/digitalCert/123',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'GET /digitalCert should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/GET /digitalCert brings the digital certificate id empty', async (assert) => {
	const route = {
		method: 'GET',
		url: '/digitalCert/',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 404;
	const message = 'GET /digitalCert should return a status code of 404';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/GET /digitalCert successful digital certificate query', async (assert) => {
	const route = {
		method: 'GET',
		url: '/digitalCert/1',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 200;
	const message = 'GET /digitalCert should return a status code of 200';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/PATCH /digitalCert brings the digital certificate id does not exist', async (assert) => {
	const route = {
		method: 'PATCH',
		payload: {
			password: 'eyJhHGciOipIxztixt5o1',
			digital_cert: 'pruebas',
			company_id: 1,
		},
		url: '/digitalCert/143',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'PATCH /digitalCert should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/PATCH /digitalCert brings the digital certificate id empty', async (assert) => {
	const route = {
		method: 'PATCH',
		payload: {
			password: 'eyJhHGciOipIxztixt5o1',
			digital_cert: 'pruebas',
			company_id: 1,
		},
		url: '/digitalCert/',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 404;
	const message = 'PATCH /digitalCert should return a status code of 404';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/PATCH /digitalCert creates a update digitalCert', async (assert) => {
	const route = {
		method: 'PATCH',
		payload: {
			password: 'eyJhHGciOipIxztixt5o1',
			digital_cert: 'pruebas',
			company_id: 1,
		},
		url: '/digitalCert/1',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 200;
	const message = 'PATCH /digitalCert should return a status code of 200';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/PATCH /digitalCert creates a new digital certificate with the id_company does not exist', async (assert) => {
	const route = {
		method: 'PATCH',
		payload: {
			password: 'eyJhHGciOipIxztixt5o1',
			digital_cert: 'pruebas',
			company_id: 154,
		},
		url: '/digitalCert/43',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'PATCH /digitalCert should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/DELETE /digitalCert brings the digital certificate id does not exist', async (assert) => {
	const route = {
		method: 'DELETE',
		url: '/digitalCert/434',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'DELETE /digitalCert should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/DELETE /digitalCert brings the digital certificate id empty', async (assert) => {
	const route = {
		method: 'DELETE',
		url: '/digitalCert/',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 404;
	const message = 'DELETE /digitalCert should return a status code of 404';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/DELETE /digitalCert id successfully removed', async (assert) => {
	const route = {
		method: 'DELETE',
		url: '/digitalCert/1',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 200;
	const message = 'DELETE /digitalCert should return a status code of 200';

	assert.equal(actual, expected, message);

	assert.end();
});
test('/DELETE /company delete an company', async (assert) => {
	const route = {
		method: 'DELETE',
		url: '/company/2',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 200;
	const message = 'DELETE /company should return status code 200';

	assert.equal(actual, expected, message);

	assert.end();
});

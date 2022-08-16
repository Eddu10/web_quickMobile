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

test('/POST /electronicDocument creates a new electronic document', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			company_id: 1,
			doc_number: '1234',
			access_key: 'qwert',
			auth_number: '123456',
			xml_content: 'asdfg',
			state: 'activo',
			auth_date: '2022-04-20',
			last_attempt_date: '2022-04-20',
			attempt_number: 4,
			issue_date: '2022-04-20',
			xml_auth: 'qwerty',
		},
		url: '/electronicDocument',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 201;
	const message =
		'POST /electronicDocument should return a status code of 201';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /electronicDocument creates a new electronic document with duplicate doc_number', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			company_id: 1,
			doc_number: '1234',
			access_key: 'qwerty',
			auth_number: '1234567',
			xml_content: 'asdfgh',
			state: 'activo',
			auth_date: '2022-04-21',
			last_attempt_date: '2022-04-21',
			attempt_number: 4,
			issue_date: '2022-04-21',
			xml_auth: 'qwerty',
		},
		url: '/electronicDocument',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message =
		'POST /electronicDocument should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /electronicDocument creates a new electronic document with duplicate access_key', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			company_id: 1,
			doc_number: '12345',
			access_key: 'qwert',
			auth_number: '12345678',
			xml_content: 'asdfgh',
			state: 'activo',
			auth_date: '2022-04-21',
			last_attempt_date: '2022-04-21',
			attempt_number: 4,
			issue_date: '2022-04-21',
			xml_auth: 'qwerty',
		},
		url: '/electronicDocument',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message =
		'POST /electronicDocument should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /electronicDocument creates a new electronic document with duplicate auth_number', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			company_id: 1,
			doc_number: '123456',
			access_key: 'qwertyu',
			auth_number: '123456',
			xml_content: 'asdfgh',
			state: 'activo',
			auth_date: '2022-04-21',
			last_attempt_date: '2022-04-21',
			attempt_number: 4,
			issue_date: '2022-04-21',
			xml_auth: 'qwerty',
		},
		url: '/electronicDocument',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message =
		'POST /electronicDocument should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /electronicDocument creates a new electronic document with a non-existent company_id', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			company_id: 12,
			doc_number: '1234567',
			access_key: 'qwertyuo',
			auth_number: '123456789',
			xml_content: 'asdfgh',
			state: 'activo',
			auth_date: '2022-04-21',
			last_attempt_date: '2022-04-21',
			attempt_number: 4,
			issue_date: '2022-04-21',
			xml_auth: 'qwerty',
		},
		url: '/electronicDocument',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	userId = result.id;

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message =
		'POST /electronicDocument should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/POST /electronicDocument creates a new electronic document with empty field company_id', async (assert) => {
	const route = {
		method: 'POST',
		payload: {
			company_id: '',
			doc_number: '12345678',
			access_key: 'qwertyui',
			auth_number: '1234567890',
			xml_content: 'asdfgh',
			state: 'activo',
			auth_date: '2022-04-21',
			last_attempt_date: '2022-04-21',
			attempt_number: 4,
			issue_date: '2022-04-21',
			xml_auth: 'qwerty',
		},
		url: '/electronicDocument',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	userId = result.id;

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message =
		'POST /electronicDocument should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/GET /electronicDocument list electronic document with wrong id parameter', async (assert) => {
	const route = {
		method: 'GET',
		url: '/electronicDocument/15',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message =
		'GET /electronicDocument should return a status code of 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/GET /electronicDocument list electronic document with empty id parameter', async (assert) => {
	const route = {
		method: 'GET',
		url: '/electronicDocument/',
	};
	const { statusCode } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 404;
	const message =
		'GET /electronicDocument should return a status code of 404';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/PATCH /electronicDocument update an electronic document', async (assert) => {
	const route = {
		method: 'PATCH',
		payload: {
			xml_content: 'poiuyt',
			state: 'normal',
			auth_date: '2022-04-21',
			last_attempt_date: '2022-03-21',
			attempt_number: 10,
			issue_date: '2022-03-21',
			xml_auth: 'hjkl',
		},
		url: '/electronicDocument/1',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 200;
	const message = 'PATCH /electronicDocument should return status code 200';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/PATCH /electronicDocument update an electronic document with wrong id parameter', async (assert) => {
	const route = {
		method: 'PATCH',
		payload: {
			xml_content: 'mnbv',
			state: 'normal',
			auth_date: '2022-02-21',
			last_attempt_date: '2022-02-21',
			attempt_number: 12,
			issue_date: '2022-02-21',
			xml_auth: 'zxcvcx',
		},
		url: '/electronicDocument/15',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'PATCH /electronicDocument should return status code 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/PATCH /electronicDocument update an establishment with empty id parameter', async (assert) => {
	const route = {
		method: 'PATCH',
		payload: {
			xml_content: 'vgnhg',
			state: 'normal',
			auth_date: '2022-01-21',
			last_attempt_date: '2022-01-21',
			attempt_number: 45,
			issue_date: '2022-01-21',
			xml_auth: 'sdfesa',
		},
		url: '/electronicDocument/',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 404;
	const message = 'PATCH /electronicDocument should return status code 404';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/PATCH /electronicDocument update only one field in an electronicDocument', async (assert) => {
	const route = {
		method: 'PATCH',
		payload: {
			state: 'rechazado',
		},
		url: '/electronicDocument/1',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 200;
	const message = 'PATCH /electronicDocument should return status code 200';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/DELETE /electronicDocument delete an electronicDocument with wrong id parameter', async (assert) => {
	const route = {
		method: 'DELETE',
		url: '/electronicDocument/15',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 400;
	const message = 'DELETE /electronicDocument should return status code 400';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/DELETE /electronicDocument delete an electronicDocument with empty id parameter', async (assert) => {
	const route = {
		method: 'DELETE',
		url: '/electronicDocument/',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 404;
	const message = 'DELETE /electronicDocument should return status code 404';

	assert.equal(actual, expected, message);

	assert.end();
});

test('/DELETE /electronicDocument delete an electronicDocument', async (assert) => {
	const route = {
		method: 'DELETE',
		url: '/electronicDocument/1',
		headers: { authorization: `Bearer ${token}` },
	};
	const { statusCode, result } = await global.serverTest.inject(
		createRouteTest(route),
	);

	assert.plan(1);

	const actual = statusCode;
	const expected = 200;
	const message =
		'DELETE /estabelectronicDocumentlishment should return status code 200';

	assert.equal(actual, expected, message);

	assert.end();
});

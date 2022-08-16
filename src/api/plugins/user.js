'use strict';

const createRoute = require('../routes/user/create');
const deleteRoute = require('../routes/user/delete');
const detailRoute = require('../routes/user/detail');
const listRoute = require('../routes/user/list');
const patchRoute = require('../routes/user/patch');

const plugin = {
	name: 'users-table',
	version: '1.0.0',
	register: (server, options) => {
		server.route(createRoute);
		server.route(deleteRoute);
		server.route(detailRoute);
		server.route(listRoute);
		// server.route(patchRoute);
	},
};

exports.plugin = plugin;

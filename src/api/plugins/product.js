'use strict';

const createRoute = require('../routes/product/create');
const deleteRoute = require('../routes/product/delete');
const detailRoute = require('../routes/product/detail');
const listRoute = require('../routes/product/list');
const patchRoute = require('../routes/product/patch');
const plugin = {
	name: 'product-table',
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

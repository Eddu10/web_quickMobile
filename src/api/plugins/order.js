'use strict';

const createRoute = require('../routes/order/create');
const deleteRoute = require('../routes/order/delete');
const detailRoute = require('../routes/order/detail');
const listRoute = require('../routes/order/list');
//const patchRoute = require('../routes/order/patch');

const plugin = {
	name: 'order-table',
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

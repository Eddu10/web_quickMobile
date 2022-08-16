'use strict';

const objection = require('objection');
const snakePlugin = require('./plugins/snake');
const softDeletePlugin = require('./plugins/softDelete');
const autoDatePlugin = require('./plugins/autoDate');

const { Model, compose } = objection;
const mixins = compose(autoDatePlugin, snakePlugin, softDeletePlugin);

class BaseModel extends mixins(Model) {
	static includePaginationAndSort(query, filter) {
		let newQuery = query;
		if (filter.page) {
			newQuery = query.page(
				filter.page - 1,
				filter.limit || process.env.OFFSET_DEFAULT,
			);
		}
		if (filter.sortField) {
			newQuery = query.orderBy(
				filter.sortField,
				filter.sortDirection || 'desc',
			);
		}
		return newQuery;
	}
}

module.exports = BaseModel;

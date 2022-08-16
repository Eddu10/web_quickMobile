'use strict';

const baseModel = require('./base');
const helper = require('./helper');

class Order extends baseModel {
	static get tableName() {
		return 'Order';
	}

	static get jsonSchema() {
		const defaultProperties = helper.defaultFields();
		const schema = {
			type: 'object',
			required: ['description', 'date', 'price', 'user_id'],
			properties: {
				description: {
					type: 'string',
				},
				date: {
					type: 'object',
				},
				price: {
					type: 'number',
				},
				obesrvation: {
					type: 'string',
				},
				user_id: {
					type: 'number',
				},
				...defaultProperties,
			},
		};
		return schema;
	}

	static get namedFilters() {
		return {
			selectColumns: (builder) => builder.select(this.defaultColumns()),
		};
	}

	static defaultColumns() {
		return ['id', 'description', 'date', 'price', 'observation', 'user_id'];
	}

	static getById(id) {
		return this.query().findById(id);
	}

	static create(data) {
		return this.query().insert(data);
	}

	static getAll(filter = {}) {
		return this.query()
			.select(this.defaultColumns())
			.skipUndefined()
			.where('date', filter.date)
			.skipUndefined()
			.where('user_id', filter.user_id)
			.hapiFilter(filter);
	}

	static removeById(id) {
		return this.query().softDelete().where('id', id);
	}

	static edit(id, data) {
		return this.query().patch(data).where('id', id);
	}

	static findByUserId(user_id) {
		return this.query()
			.select(['id', 'description', 'price', 'user_id'])
			.where('user_id', user_id)
			.first();
	}
}

module.exports = Order;

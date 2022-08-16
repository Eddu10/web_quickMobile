'use strict';

const baseModel = require('./base');
const helper = require('./helper');

class Product extends baseModel {
	static get tableName() {
		return 'Product';
	}

	static get jsonSchema() {
		const defaultProperties = helper.defaultFields();
		const schema = {
			type: 'object',
			required: ['name', 'description', 'price', 'image'],
			properties: {
				name: {
					type: 'string',
				},
				company_name: {
					type: 'string',
				},
				description: {
					type: 'string',
				},
				price: {
					type: 'number',
				},
				image: {
					type: 'string',
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
		return ['id', 'name', 'description', 'price', 'image'];
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
			.where('name', filter.name)
			.skipUndefined()
			.where('id', filter.id)
			.hapiFilter(filter);
	}

	static removeById(id) {
		return this.query().softDelete().where('id', id);
	}

	static edit(id, data) {
		return this.query().patch(data).where('id', id);
	}

	static getProductId(id) {
		return this.query().select(['id']).where('id', id);
	}

	// static getProductName(name) {
	// 	return this.query()
	// 		.select(['id', 'name'])
	// 		.where('name', name)
	// 		.first();
	// }
}

module.exports = Product;

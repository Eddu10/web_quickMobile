'use strict';

const moment = require('moment-timezone');

function softDelete(Model) {
	class SessionQueryBuilder extends Model.QueryBuilder {
		constructor(modelClass) {
			super(modelClass);
			this.onBuild((builder) => {
				if (!builder.context().withArchived) {
					const { _operations } = builder;
					if (typeof _operations[3] === 'undefined') {
						builder.whereNull(`${modelClass.tableName}.deleted_at`);
					} else if (
						_operations[3].name.localeCompare('orWhere') !== 0
					) {
						builder.whereNull(`${modelClass.tableName}.deleted_at`);
					}
				}
			});
		}

		withArchived(withArchived) {
			this.context().withArchived = withArchived;
			return this;
		}

		softDelete() {
			return this.patch({ updatedAt: new Date(), deletedAt: new Date() });
		}

		hapiFilter(filter = {}, fields = [], tableName) {
			if (filter.page) {
				this.page(
					filter.page - 1,
					filter.limit || process.env.OFFSET_DEFAULT,
				);
			}
			if (filter.sortField) {
				this.orderBy(filter.sortField, filter.sortDirection || 'desc');
			} else if (tableName) {
				const newSortDefault = `${tableName}.${filter.sortDefault}`;
				this.orderBy(
					(filter.sortDefault && newSortDefault) ||
						`${tableName}.created_at`,
					'desc',
				);
			} else {
				this.orderBy(filter.sortDefault || 'created_at', 'desc');
			}
			if (filter.search) {
				const value = `%${filter.search}%`;
				this.where((builder) => {
					fields.forEach((field) => {
						if (tableName) {
							builder.orWhere(
								`${tableName}.${field}`,
								'like',
								value,
							);
						} else {
							builder.orWhere(field, 'like', value);
						}
					});
				});
			}
			return this;
		}

		betweenUtc({
			endDate,
			fieldName = 'created_at',
			fullDay = true,
			greaterThan = '>=',
			lowerThan = '<',
			startDate,
		}) {
			if (startDate && endDate) {
				const sd = moment(startDate).add(5, 'hours');
				const ed = moment(endDate);
				if (fullDay) {
					ed.add(1, 'day');
				}
				ed.add(5, 'hours');
				this.where((builder) =>
					builder
						.where(
							fieldName,
							greaterThan,
							sd.format('YYYY-MM-DD HH:mm:ss'),
						)
						.where(
							fieldName,
							lowerThan,
							ed.format('YYYY-MM-DD HH:mm:ss'),
						),
				);
			}
			return this;
		}
	}

	const softDeleteClass = class extends Model {
		static get QueryBuilder() {
			return SessionQueryBuilder;
		}
	};

	return softDeleteClass;
}

module.exports = softDelete;

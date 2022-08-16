'use strict';

function defaultFields() {
	const defaultProperties = {
		createdAt: {
			type: 'object',
		},
		deletedAt: {
			type: ['object', 'null'],
			default: null,
		},
		flagActive: {
			type: 'boolean',
			default: true,
		},
		updatedAt: {
			type: 'object',
		},
	};
	return defaultProperties;
}

const methods = {
	defaultFields,
};

module.exports = methods;

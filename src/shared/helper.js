'use strict';

function isDevOrProd() {
	return (
		process.env.NODE_ENV === 'development' ||
		process.env.NODE_ENV === 'production'
	);
}

function uniqueValues(arr) {
	return [...new Set(arr)];
}

function defaultCacheResource(expiresIn = 3600, generateTimeout = 5) {
	const cache = {
		cache: 'redisCache',
		expiresIn: isDevOrProd() ? expiresIn * 1000 : 1,
		generateTimeout: generateTimeout * 1000,
	};
	return cache;
}

const methods = {
	defaultCacheResource,
	isDevOrProd,
	uniqueValues,
};

module.exports = methods;

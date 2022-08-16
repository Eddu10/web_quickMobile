'use strict';

const Boom = require('@hapi/boom');
const { func } = require('joi');
const Company = require('../../models/Company');

const {
	existingIdNumber,
	companyIdNotExists,
} = require('../shared/error_codes');

async function validateByIdNumber(request) {
	try {
		const { id_number } = request.payload;
		if (id_number != undefined) {
			const company = await Company.getCompanyNumberId(id_number);

			if (company) {
				return Boom.badRequest(existingIdNumber);
			}
		}

		return true;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}
async function validateById(request) {
	try {
		const { id } = request.params;
		const company = await Company.getById(id);
		return company || Boom.badRequest(companyIdNotExists);
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

const pre = {
	validateByIdNumber,
	validateById,
};

module.exports = pre;

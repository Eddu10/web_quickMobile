'use strict';

const Boom = require('@hapi/boom');
const { func } = require('joi');
const Establishment = require('../../models/Establishment');
const validateEstablishment = require('../../models/Company');

const {
	establishmentNotFound,
	existingNumber,
	companyIdNotExists,
} = require('../shared/error_codes');

async function validateById(request) {
	try {
		const { id } = request.params;
		const establishments = await Establishment.getById(id);
		return establishments || Boom.badRequest(establishmentNotFound);
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

async function validateByNumber(request) {
	try {
		const { number } = request.payload;

		if (number != undefined) {
			const id = await Establishment.findByNumber(number);

			if (id) {
				return Boom.badRequest(existingNumber);
			}
		}

		return true;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

async function validationByCompanyId(request) {
	try {
		const { company_id } = request.payload;
		if (company_id != undefined) {
			const id = await validateEstablishment.getCompanyId(company_id);
			if (id && id.length == 0) {
				return Boom.badRequest(companyIdNotExists);
			}
			return id;
		}
		return null;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

const pre = {
	validateById,
	validateByNumber,
	validationByCompanyId,
};

module.exports = pre;

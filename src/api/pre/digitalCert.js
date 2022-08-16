'use strict';

const Boom = require('@hapi/boom');
const { func } = require('joi');
const DigitalCert = require('../../models/DigitalCert');

const { companyIdNotExists } = require('../shared/error_codes');
const validateEloctricDocument = require('../../models/Company');
async function validateById(request) {
	try {
		const { id } = request.params;
		const digitalCert = await DigitalCert.getById(id);
		return digitalCert || Boom.badRequest(companyIdNotExists);
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

async function validationByCompanyId(request) {
	try {
		const { company_id } = request.payload;
		if (company_id != undefined) {
			const id = await validateEloctricDocument.getCompanyId(company_id);
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
	validationByCompanyId,
};

module.exports = pre;

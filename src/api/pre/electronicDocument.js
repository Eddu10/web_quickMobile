'use strict';

const Boom = require('@hapi/boom');
const { func } = require('joi');
const ElectronicDocument = require('../../models/ElectronicDocument');
const validateEloctricDocument = require('../../models/Company');

const {
	electronicDocumentNotFound,
	companyIdNotExists,
	existingDocNumber,
	existingAccessKey,
	existingAuthNumber,
} = require('../shared/error_codes');

async function validateById(request) {
	try {
		const { id } = request.params;
		const electronicDocument = await ElectronicDocument.getById(id);
		return (
			electronicDocument || Boom.badRequest(electronicDocumentNotFound)
		);
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

async function validateByDocNumber(request) {
	try {
		const { doc_number } = request.payload;
		const id = await ElectronicDocument.findByDocNumber(doc_number);

		if (id) {
			return Boom.badRequest(existingDocNumber);
		}

		return true;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

async function validateByAccessKey(request) {
	try {
		const { access_key } = request.payload;
		const id = await ElectronicDocument.findByAccessKey(access_key);

		if (id) {
			return Boom.badRequest(existingAccessKey);
		}

		return true;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

async function validateByAuthNumber(request) {
	try {
		const { auth_number } = request.payload;
		const id = await ElectronicDocument.findByAuthNumber(auth_number);

		if (id) {
			return Boom.badRequest(existingAuthNumber);
		}

		return true;
	} catch (error) {
		return Boom.badImplementation(error, error);
	}
}

const pre = {
	validateById,
	validationByCompanyId,
	validateByDocNumber,
	validateByAccessKey,
	validateByAuthNumber,
};

module.exports = pre;

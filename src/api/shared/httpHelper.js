'use strict';

function failAction(request, h, error) {
	const newError = error;
	newError.reformat();

	// Change message for password validation
	if (error.output.payload.message.includes('ref:password')) {
		newError.output.payload.message = 'Passwords do not match';
	}

	newError.output.payload.code = 'validation_error';
	return newError;
}

const methods = {
	failAction,
};

module.exports = methods;

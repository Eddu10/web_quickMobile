'use strict';

const moment = require('moment');

function autoDate(Model) {
	const autoDateClass = class extends Model {
		$beforeInsert(context) {
			const objPromise = super.$beforeInsert(context);
			return Promise.resolve(objPromise).then(() => {
				this.createdAt = moment().local().format('YYYY-MM-DD HH:mm:ss');
				this.updatedAt = moment().local().format('YYYY-MM-DD HH:mm:ss');
			});
		}

		$beforeUpdate(opt, context) {
			const objPromise = super.$beforeUpdate(opt, context);
			return Promise.resolve(objPromise).then(() => {
				this.updatedAt = moment().local().format('YYYY-MM-DD HH:mm:ss');
			});
		}
	};

	return autoDateClass;
}

module.exports = autoDate;

'use strict';

module.exports = {
	apps: [
		{
			name: 'licensing',
			script: 'src/index.js',
			env_dev: {
				NODE_ENV: 'development',
				OFFSET_DEFAULT: 20,
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
	deploy: {
		dev: {
			user: 'ubuntu',
			host: 'localhost',
			ref: 'origin/dev',
			repo: 'git@github.com:apprunn/dp6ApiPayroll.git',
			path: '/home/ubuntu/node/dp6ApiPayroll',
			'post-setup': 'npm install',
			'post-deploy':
				'npm install && npm run migrate && pm2 reload ecosystem.config.js --env dev',
			env: {
				NODE_ENV: 'development',
			},
		},
		production: {
			user: 'ubuntu',
			host: 'localhost',
			ref: 'origin/production',
			repo: 'git@github.com:apprunn/dp6ApiPayroll.git',
			path: '/home/ubuntu/node/dp6ApiPayroll',
			'post-setup': 'npm install',
			'post-deploy':
				'npm install --production && npm run migrate && pm2 reload ecosystem.config.js --env production',
			env: {
				NODE_ENV: 'production',
			},
		},
	},
};

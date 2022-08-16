# Hapi-Template

> Template for Hapi developments

### Requirements

1. NodeJs 17.8.x (install node using nvm)
2. Npm 8.5.x (automatically installed in step 1)
3. postgresql

### Technologies

1. HapiJs - [Web framework](https://hapijs.com/api)
2. Hapi Basic - [Basic authentication](https://hapi.dev/tutorials/auth)
3. Hapi JWT - [JWT authentication](https://hapi.dev/module/jwt/)
4. Hapi swagger - [Swagger documentation](https://github.com/glennjones/hapi-swagger)
5. Objection - [ORM](http://vincit.github.io/objection.js/)
6. Knex - [Query builder](http://knexjs.org/#Migrations)
7. Tape e Instabul - [Testing & code coverage](https://github.com/substack/tape)
8. Semantic Release - [Automatic semantic versioning](https://github.com/semantic-release/semantic-release)
9. Nodemon - [Monitor changes for development only](https://github.com/remy/nodemon)
10. Eslint y Prettier - [Code styling](https://eslint.org/)
11. Husky - [Git hooks](https://github.com/typicode/husky)
12. Joi - [Validations](https://www.npmjs.com/package/joi)
13. Git cz - [Standard way of committing](https://www.npmjs.com/package/git-cz)

### Development

1. Before starting development you must install the project dependencies using npm

```bash
npm install
```

2. Once installed, create an .env file to handle environment variables

```bash
nano .env
```

3. An .env file will be created in the root of the project, fill this file with the following variables

```
NODE_ENV=development

HOST=localhost
PORT=4100
SALT_ROUNDS = 10

OFFSET_DEFAULT=10

DB_HOST_DEV=db_host
DB_NAME_DEV=db_name
DB_PORT_DEV=5432
DB_PASS_DEV=db_pass
DB_USER_DEV=db_user

DB_HOST_TEST=192.168.1.20
DB_PORT_TEST=32768
DB_PASS_TEST=c_user_test
DB_NAME_TEST=c_bd
DB_USER_TEST=c_password_test

DB_TABLE_MIGRATIONS=c_migrations
```

Feel free to add any value you consider important for the project, but in case you add something update this file.
ALWAYS INDICATE **EXAMPLE VALUES** OF THE .env AND NOT THE REAL ONES.

### Commit y Push

The project has several tools for automating commits, releases and changelogs, so certain tasks are handled differently, one of them is the way a commit is done.
Normally we use **git commit -m "message "**, but in this project we will use the following script

```bash
npm run commit
```

Now you must answer the questions that appear, each question will build the commit message under a template so that all commits handle the same structure and it will be much easier to generate
**CHANGELOGS** every time a new version of the project is released.

Once the commit has been completed, the push is performed.

```bash
git push origin branch-name
```

### Testing

Before running the tests, 2 important things should be checked in the file
**.env** file

1. The variable **NODE_ENV** must have as value **test**.
2. The DB variables that end in \_TEST must be configured correctly.
   correctly.

The importance of these 2 steps is vital since normally the testing will always execute as first process a script that leaves the DB in an initial state of testing, normally this means to erase completely all the data of the tables, this way we make sure that the tests always follow all the flows of our project, besides being able to detect if some change affects these flows.

### Bug Tracker

Bugs are tracked on [GitHub Issues](https://github.com//josarmas9416/hapi-test/issues).
In case of trouble, please check there if your issue has already been reported.
If you spotted it first, help us smashing it by providing a detailed and welcomed
[feedback](https://github.com/josarmas9416/hapi-test/issues/new?body=**Steps%20to%20reproduce**%0A-%20...%0A%0A**Current%20behavior**%0A%0A**Expected%20behavior**).

Do not contact contributors directly about support or help with technical issues.

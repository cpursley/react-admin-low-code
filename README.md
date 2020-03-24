# React Admin Low Code

[![CircleCI](https://circleci.com/gh/dvasdekis/react-admin-low-code.svg?style=svg)](https://circleci.com/gh/dvasdekis/react-admin-low-code)

This is an example [react-admin](https://marmelab.com/react-admin/) application (configuration based CRUD admin UI builder) demonstrating how to use the [ra-data-hasura-graphql](https://github.com/Steams/ra-data-hasura-graphql) data provider with a [Hasura](https://hasura.io/) (automatic GraphQL API backend on top of PostgreSQL). By combining these two technologies, you can build an entire back office admin suite in a matter of hours. 

## Available Scripts

In the project directory, you can run: `docker-compose up --quiet-pull --force-recreate --build`

It will take more time to run the first time, as Docker installs node_modules in a temporary container.

The containers that get started are:
 - Webserver (ra-webserver) - Creates the npm-built webserver on port 8080
 - Hasura (graphql-engine) - Creates a Hasura instance on port 8081
 - Postgres (postgres) - Database instance
 - Flyway (flyway) - Migrates (runs starting SQL) the Postgres container to the state described in your SQL files in `./migrations/sql`
 - graphql-migrations - Migrates (sets initial config) the Hasura container to the state described in your metadata.json file in `./migrations/hasura`
 - PGTap - Tests the database instance against PGTap SQL as written in `./tests/sql`

Ideally there'd be a container that runs frontend tests for the ra-webserver instance. But I am a backend guy and I don't know how they work.


### Webserver only:

To run just the webserver locally, you can run:

#### `npm run-script start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm run-script test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run-script build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

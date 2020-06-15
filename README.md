# React Admin Low Code

This is an example [react-admin](https://marmelab.com/react-admin/) application (configuration based CRUD admin UI builder) demonstrating how to use the [ra-data-hasura-graphql](https://github.com/Steams/ra-data-hasura-graphql) data provider with a [Hasura](https://hasura.io/) (automatic GraphQL API backend on top of PostgreSQL). By combining these two technologies, you can build an entire back office admin suite in a matter of hours. 

## Alternatives

[@dvasdekis](https://github.com/dvasdekis) has taken this concept a step further and integrated Docker Compose for development, Firebase for authentication and Flyway for database migrations.

Check it out here: [react-admin-hasura-firebase](https://github.com/dvasdekis/react-admin-hasura-firebase)

[@hgiasac](hgiasac) has also put together a very complete example with TypeScript. He's created several branches demonstrating auth with [jtw](https://github.com/hgiasac/ra-hasura-typescript-boilerplate/tree/auth-jwt) and [firebase](https://github.com/hgiasac/ra-hasura-typescript-boilerplate/tree/auth-firebase) as well as a backend that includes Hasura Actions and Events and auth:

- [ra-hasura-typescript-boilerplate](https://github.com/hgiasac/ra-hasura-typescript-boilerplate)
- [hasura-typescript-boilerplate](https://github.com/hgiasac/hasura-typescript-boilerplate)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

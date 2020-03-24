import React from 'react';
import {Admin, Resource} from 'react-admin';
import {TodoCreate, TodoEdit, TodoList} from './todos';
import {UserList, UserShow} from './users';
import buildHasuraProvider from 'ra-data-hasura-graphql';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {FirebaseAuthProvider} from 'react-admin-firebase';


// Define Firebase auth provider
const firebaseConfig = {
    apiKey: "AIzaSyDL9pXM6XuKDKs-jcCuZuc263t6yAHk7xc",
    authDomain: "react-admin-low-code.firebaseapp.com",
    databaseURL: "https://react-admin-low-code.firebaseio.com",
    projectId: "react-admin-low-code",
    storageBucket: "react-admin-low-code.appspot.com",
    messagingSenderId: "477028362078",
    appId: "1:477028362078:web:9ab7803d11783132f6d1cf"
  };
const firebaseOptions = {
  // Enable logging of react-admin-firebase
  logging: true,
  // Authentication persistence, defaults to 'session', options are 'session' | 'local' | 'none'
  persistence: 'local'
};


// Define Hasura data provider
const hasuraUri = "http://localhost:8081/v1/graphql";


// Define main App
const App = async () => {
    const authProvider = FirebaseAuthProvider(firebaseConfig, firebaseOptions);
    //let firebaseJWT = await authProvider.getJWTToken();
    //console.log(`JWT: ${firebaseJWT}`);
    // When we aren't logged in, we want to use the anonymous hasura role. When we are, change the client to include the bearer token.
    // Below sets headers to anonymous if JWT is null, otherwise it sets them properly
    // var apolloHeaders = (!firebaseJWT) ? {'x-hasura-role': 'anonymous'} : {authorization: `Bearer ${firebaseJWT}`, };
    // var usertype = (!firebaseJWT) ? 'null condition' : 'logged in';

    let hasuraDataProvider = authProvider.getJWTToken().then(function (JWT) {
        const httpLink = createHttpLink({
            uri: hasuraUri,
        });
        const authLink = setContext((_, { headers }) => {
          console.log(`Token: ${JWT}`);
          // return the headers to the context so httpLink can read them
          return {
            headers: {
              ...headers,
              ...(JWT ? {authorization: `Bearer ${JWT}`} : {}),
            }
          }
        });
        const apolloClientInstance = new ApolloClient({
          link: authLink.concat(httpLink),
          cache: new InMemoryCache(),
        });
        return buildHasuraProvider({client: apolloClientInstance})
    };

    return () => (
        <Admin
            dataProvider={hasuraDataProvider}
            authProvider={authProvider}
            // dashboard={Dashboard}
        >
            <Resource
                name="todos"
                icon={PostIcon}
                list={TodoList}
                edit={TodoEdit}
                create={TodoCreate}
            />
            <Resource
                name="users"
                icon={UserIcon}
                list={UserList}
                show={UserShow}
            />
        </Admin>
    );
};

export default App;

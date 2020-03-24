import React from 'react';
import { Admin, Resource } from 'react-admin';
import { TodoList, TodoEdit, TodoCreate } from './todos';
import { UserList, UserShow } from './users';
import buildHasuraProvider from 'ra-data-hasura-graphql';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import ApolloClient from 'apollo-boost';
import { FirebaseAuthProvider } from 'react-admin-firebase';


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
const authProvider = FirebaseAuthProvider(firebaseConfig, firebaseOptions);

// Define Hasura data provider
const hasuraUri = "http://localhost:8081/v1/graphql";


// Define main App
const App = async () => {
    let firebaseJWT = await authProvider.getJWTToken();
    console.log(`JWT: ${firebaseJWT}`);
    // When we aren't logged in, we want to use the anonymous hasura role. When we are, change the client to include the bearer token.
    // Below sets headers to anonymous if JWT is null, otherwise it sets them properly
    var apolloHeaders = (!firebaseJWT) ? {'x-hasura-role': 'anonymous'} : {authorization: `Bearer ${firebaseJWT}`, 'x-hasura-role': 'user'};
    let apolloClientInstance = new ApolloClient({uri: hasuraUri, headers: apolloHeaders});
    let hasuraDataProvider = await buildHasuraProvider({ client: apolloClientInstance });

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

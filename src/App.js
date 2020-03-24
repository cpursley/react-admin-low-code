import React from 'react';
import { fetchUtils, Admin, Resource } from 'react-admin';
import { TodoList, TodoEdit, TodoCreate } from './todos';
import { UserList, UserShow } from './users';
import hasuraDataProvider from 'ra-data-hasura';
//import PostIcon from '@material-ui/icons/Book';
//import UserIcon from '@material-ui/icons/Group';
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

const uri = "http://localhost:8081";
const authProvider = FirebaseAuthProvider(firebaseConfig, firebaseOptions);

// See example for dynamic headers here: https://stackoverflow.com/questions/57454456/how-to-update-data-provider-headers-dynamically-in-hasura-react-admin

const App = async () => {
    const httpClient = (url, options = {}) => {
      if (!options.headers) {
          options.headers = new Headers({ Accept: 'application/json' });
      }
      // add your own headers here
      authProvider.getJWTToken().then(function (JWT) {
          options.headers.set('Authorization', `Bearer ${JWT}`)});
      return fetchUtils.fetchJson(url, options);
    };
    const dataProvider = hasuraDataProvider(uri, httpClient);

    return () => (
        <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            // dashboard={Dashboard}
        >
            <Resource
                name="todos"
                //icon={PostIcon}
                list={TodoList}
                edit={TodoEdit}
                create={TodoCreate}
            />
            <Resource
                name="users"
                //icon={UserIcon}
                list={UserList}
                show={UserShow}
            />
        </Admin>
    );
};

export default App;

import React, { useState, useEffect } from "react";
import { fetchUtils, Admin, Resource } from "react-admin";
import { TodoCreate, TodoEdit, TodoList } from "./todos";
import { UserList, UserShow } from "./users";
import hasuraDataProvider from "ra-data-hasura";
//import PostIcon from '@material-ui/icons/Book';
//import UserIcon from '@material-ui/icons/Group';
import { FirebaseAuthProvider } from "react-admin-firebase";

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
  persistence: "local"
};

// Define Hasura data provider
const hasuraUri = "http://localhost:8081";
const authProvider = FirebaseAuthProvider(firebaseConfig, firebaseOptions);

// Define main App
const App = () => {
  const [token, setToken] = useState(undefined);
  useEffect(() => {
    authProvider.getJWTToken().then(function(JWT) {
      setToken(JWT);
    });
  }, []);
  const httpClient = (url, options = {}) => {
    if (!options.headers) {
      options.headers = new Headers({ Accept: "application/json" });
    }
    // add your own headers here
    if (token) {
      console.log(token);
      options.headers.set("Authorization", `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options);
  };
  const dataProvider = hasuraDataProvider(hasuraUri, httpClient);

  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      // dashboard={Dashboard}
    >
      <Resource
        name="todos"
        list={TodoList}
        edit={TodoEdit}
        create={TodoCreate}
      />
      <Resource name="users" list={UserList} show={UserShow} />
    </Admin>
  );
};

export default App;

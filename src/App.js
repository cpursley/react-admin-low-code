import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { TodoList, TodoEdit, TodoCreate } from './todos';
import { UserList } from './users';
// import jsonServerProvider from 'ra-data-json-server';
import hasuraDataProvider from 'ra-data-hasura';
// import hasuraDataProvider from 'ra-data-hasura-graphql';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';


const headers = {'content-type': 'application/json', 'authorization': 'bearer <token>'};
const App = () => (
  <Admin
    dataProvider={hasuraDataProvider('https://low-code-api.herokuapp.com', headers)}
    // authProvider={authProvider}
    // dashboard={Dashboard}
  >
    <Resource
      name="todos"
      icon={PostIcon}
      list={TodoList}
      edit={TodoEdit}
      create={TodoCreate}
      // show={TodoShow}
    />
    <Resource name="users" icon={UserIcon} list={UserList} />
    {/* <Resource name="todos" list={ListGuesser} /> */}
  </Admin>
);

export default App;

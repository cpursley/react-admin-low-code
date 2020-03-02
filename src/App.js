import React from 'react';

import { Admin, Resource } from 'react-admin';
import { TodoList, TodoEdit, TodoCreate } from './todos';
import { UserList, UserShow } from './users';
import buildHasuraProvider from 'ra-data-hasura-graphql';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

const uri = "https://localhost:8080/v1/graphql";

const App = async () => {
    const hasuraDataProvider = await buildHasuraProvider({ clientOptions: { uri: uri }});

    return () => (
        <Admin
            dataProvider={hasuraDataProvider}
            // authProvider={authProvider}
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

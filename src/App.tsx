
import React from 'react';
import { Admin, Resource } from 'react-admin';
import { TodoList, TodoEdit, TodoCreate } from './todos';
import { UserList, UserShow } from './users';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';


type AppProps = {
    dataProvider: Function
}
function App(props: AppProps) {

    return (
        <Admin
            dataProvider={props.dataProvider}
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

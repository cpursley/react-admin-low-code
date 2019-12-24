import React from 'react';
// import { List, Datagrid, TextField, EmailField} from 'react-admin';
import { List, Datagrid, TextField, DateField} from 'react-admin';

// import MyUrlField from './MyUrlField';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" />
            {/* <TextField source="username" /> */}
            {/* <EmailField source="email" /> */}
            {/* <TextField source="address.street" /> */}
            {/* <TextField source="phone" />
            <MyUrlField source="website" />
            <TextField source="company.name" /> */}
        </Datagrid>
    </List>
);
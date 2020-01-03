import React from 'react';
import { List, Datagrid, TextField, DateField} from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" />
        </Datagrid>
    </List>
);
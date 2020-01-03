import React from 'react';
import { List, Filter, Datagrid, TextInput, TextField, DateField} from 'react-admin';

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by Name" source="name" alwaysOn />
    </Filter>
);

export const UserList = props => (
    <List filters={<UserFilter />} {...props}>

        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" />
        </Datagrid>
    </List>
);
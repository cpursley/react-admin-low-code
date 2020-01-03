import React from 'react';
import { List, Filter, Datagrid, TextInput, TextField, DateField, Show, SimpleShowLayout} from 'react-admin';

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by Name" source="name" alwaysOn />
    </Filter>
);

export const UserList = props => (
    <List filters={<UserFilter />} {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" label="Created At" />
        </Datagrid>
    </List>
);

export const UserShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <DateField label="Created At" source="created_at" />
        </SimpleShowLayout>
    </Show>
);
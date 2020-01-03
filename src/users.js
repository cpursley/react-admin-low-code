import React from 'react';
import { List, Filter, Datagrid, TextInput, TextField, DateField, BooleanField, Show, TabbedShowLayout, Tab, ReferenceManyField} from 'react-admin';

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

const UserTitle = ({ record }) => {
    return <span>User: {record ? `${record.name}` : ''}</span>;
};

export const UserShow = (props) => (
    <Show title={<UserTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <TextField source="id" />
                <TextField source="name" />
                <DateField label="Created At" source="created_at" />
            </Tab>
            <Tab label="todos" path="todos">
                <ReferenceManyField reference="todos" target="user_id" addLabel={false}>
                    <Datagrid rowClick="edit">
                        <TextField source="id" label="Todo Id" />
                        <TextField source="title" />
                        <BooleanField source="is_completed" label="Completed?" />
                        <DateField source="created_at" />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);
import React from 'react';
import {
    List,
    Filter,
    Datagrid,
    TextInput,
    TextField,
    DateField,
    BooleanField,
    Show,
    TabbedShowLayout,
    Tab,
    ReferenceManyField,
    TopToolbar,
    ListButton
} from 'react-admin';

const UserFilter = (props: object) => (
    <Filter {...props}>
        <TextInput label="Search by Name" source="name" alwaysOn />
    </Filter>
);

export const UserList = (props: object) => (
    <List filters={<UserFilter />} bulkActionButtons={false} {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" />
            <DateField source="created_at" label="Created At" />
        </Datagrid>
    </List>
);

const UserTitle = ({ record }: { record?: {name: string}}) => {
    return <span>User: {record ? `${record.name}` : ''}</span>;
};

const UserShowActions = ({ basePath, data }: { basePath?: string, data?: object}) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data} label="Back" />
    </TopToolbar>
);

export const UserShow = (props: object) => (
    <Show title={<UserTitle />} actions={<UserShowActions />} {...props}>
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
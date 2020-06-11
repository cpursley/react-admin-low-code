import React from 'react';
import {
    Filter,
    List,
    Edit,
    Create,
    Datagrid,
    TextField,
    ReferenceField,
    BooleanField,
    DateField,
    ReferenceInput,
    BooleanInput,
    SelectInput,
    SimpleForm,
    TextInput,
    TopToolbar,
    ListButton
} from 'react-admin';

const TodoFilter = (props: object) => (
    <Filter {...props}>
        <TextInput label="Search by Title" source="title" alwaysOn />
        <ReferenceInput label="User" source="user_id" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <BooleanInput source="is_completed" label="Completed?" allowEmpty />
    </Filter>
);

export const TodoList = (props: object) => (
    <List filters={<TodoFilter />} bulkActionButtons={false} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" label="Todo Id" />
            <TextField source="title" />
            <ReferenceField source="user_id" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <BooleanField source="is_completed" label="Completed?" />
            <DateField source="created_at" />
        </Datagrid>
    </List>
);

const TodoTitle = ({ record }: { record?: {title: string}}) => {
    return <span>Todo: {record ? `${record.title}` : ''}</span>;
};

const TodoEditActions = ({ basePath, data }: { basePath?: string, data?: object}) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data} label="Back" />
    </TopToolbar>
);

export const TodoEdit = (props: object) => (
    <Edit title={<TodoTitle />} actions={<TodoEditActions />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" label="Todo Id" />
            <ReferenceInput label="User" source="user_id" reference="users" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <BooleanInput source="is_completed" label="Is Completed?"/>
        </SimpleForm>
    </Edit>
);

export const TodoCreate = (props: object) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="user_id" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <BooleanInput source="is_completed" label="Is Completed?"/>
        </SimpleForm>
    </Create>
);
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

const TodoFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search by Title" source="title" alwaysOn />
        <ReferenceInput label="User" source="user_id" reference="email" allowEmpty>
            <SelectInput optionText="email" />
        </ReferenceInput>
        <BooleanInput source="is_completed" label="Completed?" allowEmpty />
    </Filter>
);

export const TodoList = props => (
    <List filters={<TodoFilter />} bulkActionButtons={false} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" label="Todo Id" />
            <TextField source="title" />
            <ReferenceField source="user_id" reference="users">
                <TextField source="email" />
            </ReferenceField>
            <BooleanField source="is_completed" label="Completed?" />
            <DateField source="created_at" />
        </Datagrid>
    </List>
);

const TodoTitle = ({ record }) => {
    return <span>Todo: {record ? `${record.title}` : ''}</span>;
};

const TodoEditActions = ({ basePath, data }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data} label="Back" />
    </TopToolbar>
);

export const TodoEdit = props => (
    <Edit title={<TodoTitle />} actions={<TodoEditActions />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" label="Todo Id" />
            <ReferenceInput label="User" source="user_id" reference="users" allowEmpty>
                <SelectInput optionText="email" />
            </ReferenceInput>
            <TextInput source="title" />
            <BooleanInput source="is_completed" label="Is Completed?"/>
        </SimpleForm>
    </Edit>
);

export const TodoCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="user_id" reference="users">
                <SelectInput optionText="email" />
            </ReferenceInput>
            <TextInput source="title" />
            <BooleanInput source="is_completed" label="Is Completed?"/>
        </SimpleForm>
    </Create>
);
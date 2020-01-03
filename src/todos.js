import React from 'react';
import { Filter, List, Edit, Create, Datagrid, TextField, ReferenceField, BooleanField, DateField, ReferenceInput, BooleanInput, SelectInput, DateInput, DisabledInput, SimpleForm, TextInput} from 'react-admin';

const TodoFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput label="User" source="user_id" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
        <BooleanInput source="is_completed" label="Completed?" allowEmpty />
        <DateInput source="created_at" label="Created At" allowEmpty />
    </Filter>
);

export const TodoList = props => (
    <List filters={<TodoFilter />} {...props}>
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

const TodoTitle = ({ record }) => {
    return <span>Todo: {record ? `${record.title}` : ''}</span>;
};

export const TodoEdit = props => (
    <Edit title={<TodoTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" label="Todo Id" />
            <ReferenceInput label="User" source="user_id" reference="users" allowEmpty>
                <SelectInput optionText="name" />
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
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <BooleanInput source="is_completed" label="Is Completed?"/>
        </SimpleForm>
    </Create>
);
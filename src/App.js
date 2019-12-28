import React, { Component } from 'react';

import { Admin, Resource, ListGuesser } from 'react-admin';
import { TodoList, TodoEdit, TodoCreate } from './todos';
import { UserList } from './users';
// import jsonServerProvider from 'ra-data-json-server';
// import hasuraDataProvider from 'ra-data-hasura';
import buildHasuraProvider from 'ra-data-hasura-graphql';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

const uri = "https://low-code-api.herokuapp.com/v1/graphql";

// const headers = {'content-type': 'application/json', 'authorization': 'bearer <token>'};

class App extends Component {
    constructor() {
        super();
        this.state = { dataProvider: null };
    }
    componentDidMount() {
        buildHasuraProvider({ clientOptions: { uri: uri }})
            .then(dataProvider => this.setState({ dataProvider }));
    }

    render() {
        const { dataProvider } = this.state;

        if (!dataProvider) {
            return <div>Loading</div>;
        }

        return (
                <Admin
                    dataProvider={dataProvider}

                    // authProvider={authProvider}
                    // dashboard={Dashboard}
                >
                    <Resource
                        name="todos"
                        icon={PostIcon}
                        list={TodoList}
                        edit={TodoEdit}
                        create={TodoCreate}
                        // show={TodoShow}
                    />
                    <Resource name="users" icon={UserIcon} list={UserList} />
                {/* <Resource name="todos" list={ListGuesser} /> */}
                </Admin>
        );
    }
}

export default App;

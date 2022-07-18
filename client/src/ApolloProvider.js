import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client';
import App from './App';

const client = new ApolloClient({
    uri: 'https://localhost:5000',
    cache: new InMemoryCache(),
});

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)
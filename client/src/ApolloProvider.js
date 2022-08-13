import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {createUploadLink} from 'apollo-upload-client';

import App from './App';

const uploadLink = createUploadLink({
    uri: '/graphql'
})

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: { Authorization: token ?  `Bearer ${token}` : ''}
    }
})

const client = new ApolloClient({ 
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache(),
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {createUploadLink} from 'apollo-upload-client';

import App from './App';

const uploadLink = createUploadLink({
    uri: 'http://localhost:5000/graphql'
})

// const httplink = createHttpLink({
//     uri: 'http://localhost:5000'
// })

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
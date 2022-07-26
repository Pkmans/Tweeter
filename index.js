import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import cors from 'cors';

import { MONGODB } from './config.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';

async function startServer() {

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req }),
        csrfPrevention: false
        // cors: {
        //     origin: ['http://localhost:5000/graphql', 'http://localhost:5000/']
        // }
    })

   

    await server.start();

    const app = express();

    // This middleware should be added before calling `applyMiddleware`.
    app.use(graphqlUploadExpress());

    server.applyMiddleware({ app});

    app.use(express.static('public'));

    app.use(cors());

    mongoose.connect(MONGODB)
        .then(() => {
            console.log("MongoDB connected successfully");
            return app.listen({ port: 5000 })
        })
        .then(() => {
            console.log(`🚀  Server ready at http://localhost:5000${server.graphqlPath}`);
        });
}

startServer();
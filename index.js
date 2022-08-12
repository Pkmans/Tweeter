import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import cors from 'cors';
import 'dotenv/config';

import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';

async function startServer() {

    const MONGODB = 'mongodb+srv://admin-aaron:dz4QyDNd6nma9eKO@cluster0.vjl4y.mongodb.net/tweeterDB?retryWrites=true&w=majority';

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req }),
    })

    await server.start();

    const app = express();

    // This middleware should be added before calling `applyMiddleware`.
    app.use(graphqlUploadExpress());

    server.applyMiddleware({ app });

    app.use(express.static('public'));
    app.use(cors());

    let port = process.env.PORT;
    if (port == null || port == "") {
        port = 5000;
    }

    mongoose.connect(MONGODB)
        .then(() => {
            console.log("MongoDB connected successfully");
            return app.listen({ port })
        })
        .then(() => {
            console.log(`🚀  Server started successfully`);
        });
}

startServer();
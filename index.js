const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB } = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
})

mongoose.connect(MONGODB)
    .then(() => {
        console.log("MongoDB connected successfully");
        return server.listen({ port: 5000 })
    })
    .then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
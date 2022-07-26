const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');
const profilesResolvers = require('./profiles');

module.exports = {
    /* Find out how this part works */
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postsResolvers.Query,
        ...profilesResolvers.Query,
        ...usersResolvers.Query
    },

    Mutation : {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...profilesResolvers.Mutation
    }
}
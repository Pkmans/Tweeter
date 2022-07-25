const {gql} = require('apollo-server');

module.exports = gql`
    type Post {
        id: ID!
        body: String!
        username: String!
        createdAt: String!
        likes: [Like]!
        comments: [Comment]!
        likeCount: Int!
        commentCount: Int!
    }
    type Profile {
        id: ID!
        username: String!
        email: String!
        phone: String!
        school: String!
        location: String!
        bio: String!
        birthDate: String!
    }
    type Like {
        id: ID!
        username: String!
        createdAt: String!
    }
    type Comment {
        id: ID!
        username: String!
        body: String!
        createdAt: String!
    }
    type User{
        id: ID!
        username: String!
        email: String!
        createdAt: String!
        token: String!
    }
    input RegisterInput{
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }
    type Query {
        getPosts: [Post]
        getPost(postId: ID!): Post
        getProfile(profileId: ID!): Profile!
    }
    type Mutation {
        login(username: String!, password: String!): User!
        register(registerInput: RegisterInput): User!
        createPost(body: String!): Post!
        editPost(postId: ID!, newBody: String!): Post!
        deletePost(postId: ID!): String!
        likePost(postId: ID!): Post!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        createProfile(username: String!, email: String!): Profile!
    }
`;

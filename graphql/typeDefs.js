import { gql } from 'apollo-server-express';

export default gql`
    scalar Upload

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
    type File {
        url: String!
        filename: String!
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
        relationship: String!
        picture: String!
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
        likes: [Like]!
        likeCount: Int!
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
        # getPostUser(postId: ID!): String
        getUserProfile(username: String!): Profile!
        getProfile(profileId: ID!): Profile!
    }
    type Mutation {
        login(username: String!, password: String!): User!
        register(registerInput: RegisterInput): User!
        createPost(body: String!): Post!
        editPost(postId: ID!, body: String!): Post!
        deletePost(postId: ID!): String!
        likePost(postId: ID!): Post!
        likeComment(postId: ID!, commentId: ID!): Comment!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        createProfile(username: String!, email: String!): Profile!
        editProfile(profileId: ID!, section: String!, body: String!): Profile!
        editMultipleProfile(profileId: ID!, phone: String!, email: String!, birthDate: String!): Profile!
        uploadFile(file: Upload!, username: String!, profileId: ID!): File!
    }
`;

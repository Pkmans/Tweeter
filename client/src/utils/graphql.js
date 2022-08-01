import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
    query {
        getPosts {
            id
            body
            username
            createdAt
            likes{
                id 
                username
            }
            likeCount
            comments{
                id
                username
                body
                likes{
                    id
                    username
                }
            }
            commentCount
        }
    }
`

export const FETCH_PROFILE_QUERY = gql`
    query getProfile($profileId: ID!) {
        getProfile(profileId: $profileId) {
            id
            username
            email
            bio
            phone
            school
            location
            birthDate
            relationship
            picture
        }
    }
`
export const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes{
                id
                username
            }
            likeCount
        }
    }

`

export const LIKE_COMMENT_MUTATION = gql`
    mutation likeComment($postId: ID!, $commentId: ID!) {
        likeComment(postId: $postId, commentId: $commentId){
            id
            likes{
                id
                username
                createdAt
            }
            likeCount
        }
    }
`

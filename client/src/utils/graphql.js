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
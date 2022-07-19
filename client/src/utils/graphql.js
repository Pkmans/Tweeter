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
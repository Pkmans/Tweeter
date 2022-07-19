import React from "react";
import { useQuery, gql } from '@apollo/client';
import { Grid } from 'semantic-ui-react'

import PostCard from '../components/PostCard';

function Home() {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    if (data) {
        console.log(data.getPosts);
    }

    return (
        <Grid columns={3} >
            <Grid.Row className="home-page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <p>Loading Posts...</p>
                ) : (
                    data.getPosts && data.getPosts.map(post => (
                        <Grid.Column className="grid-column" key={post.id}>
                            <PostCard post={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
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

export default Home;
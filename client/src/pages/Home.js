import React, {useContext} from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid } from 'semantic-ui-react'

import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

function Home() {
    const {user} = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={3} >
            <Grid.Row className="home-page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}

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

export default Home;
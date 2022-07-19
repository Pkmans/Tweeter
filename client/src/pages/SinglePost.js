import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';
import { Button, Card, Icon, Label, Grid, Image, Form } from 'semantic-ui-react';
import moment from "moment";

import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import { AuthContext } from '../context/auth';

function SinglePost() {
    const { postId } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
        variables: { postId }
    })


    let postMarkup;
    if (!getPost) {
        postMarkup = <p>Loading post...</p>
    } else {
        const { id, username, body, createdAt, likes, likeCount, comments, commentCount } = getPost;

        postMarkup = (
            <Grid>
                <Grid.Column width={4}>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                </Grid.Column>
                <Grid.Column width={12}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                        <hr />
                        <Card.Content>
                            <LikeButton post={{ id, likes, likeCount }} />

                            <Button as="div" labelPosition='right'>
                                <Button basic color='blue'>
                                    <Icon name='comments' />
                                </Button>
                                <Label as='a' basic color='blue' pointing='left'>
                                    {commentCount}
                                </Label>
                            </Button>

                            {user && user.username === username && (
                                <DeleteButton postId={id} callback={() => navigate("/")}/>
                            )}
                        </Card.Content>
                    </Card>
                </Grid.Column>

            </Grid>
        )
    }

    return postMarkup;

}

const FETCH_POST_QUERY = gql`
    query getPost($postId: ID!) {
        getPost(postId: $postId) {
            id
            username
            body
            createdAt
            likes {
                id
                username
            }
            likeCount
            comments {
                id
                username
                body
                createdAt
            }
            commentCount
        }
    }
`

export default SinglePost;
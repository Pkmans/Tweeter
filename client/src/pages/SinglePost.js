import React, { useContext, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from '@apollo/client';
import { Button, Card, Icon, Label, Grid, Image, Form } from 'semantic-ui-react';
import moment from "moment";

import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import { AuthContext } from '../context/auth';

function SinglePost() {
    const { postId } = useParams();
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);
    const navigate = useNavigate();
    const [comment, setComment] = useState('');

    const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
        variables: { postId }
    })

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update() {
            setComment('');
            commentInputRef.current.blur();
        },
        variables: { postId, body: comment }
    })


    let postMarkup;
    if (!getPost) {
        postMarkup = <p>Loading post...</p>
    } else {
        const { id, username, body, createdAt, likes, likeCount, comments, commentCount } = getPost;

        postMarkup = (
            <Grid>
                <Grid.Column width={3}>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                </Grid.Column>
                <Grid.Column width={13}>
                    <Card fluid className="card">
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
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
                                <DeleteButton postId={id} callback={() => navigate("/")} />
                            )}
                        </Card.Content>
                    </Card>
                    {user && (
                        <Card fluid>
                            <Card.Content>
                                <h4>Post a comment</h4>
                                <Form>
                                    <div className='ui input fluid'>
                                        <input
                                            type='text'
                                            placeholder='Comment...'
                                            name='comment'
                                            value={comment}
                                            onChange={event => setComment(event.target.value)}
                                            ref={commentInputRef}
                                        />
                                    </div>
                                    <Button
                                        type='submit'
                                        className='ui button teal'
                                        disabled={comment.trim() === ''}
                                        onClick={createComment}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Content>
                        </Card>
                    )}

                    {comments.map(comment => {
                        return (
                            <Card fluid>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id} />
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        )
                    })}
                </Grid.Column>
            </Grid>
        )
    }

    return postMarkup;
}

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments{
                id 
                body 
                createdAt 
                username
            }
            commentCount
        }
    }
`

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
import React, { useContext, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Button, Card, Comment, Header, Icon, Label, Grid, Image, Form } from 'semantic-ui-react';
import moment from 'moment';

import LikeButton from '../components/LikeButton';
import LikeButtonSubtle from '../components/LikeButtonSubtle';
import DeleteButton from '../components/DeleteButton';
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
            <Grid className='page-container'>

                <Grid.Column width={3}>
                    <Image className='profile-picture' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                </Grid.Column>

                <Grid.Column width={13}>
                    <Card fluid className='card'>
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                        <Card.Content>
                            <LikeButton postId={id} likes={likes} likeCount={likeCount} />

                            <Button as='div' labelPosition='right'>
                                <Button size='tiny' basic color='blue'>
                                    <Icon name='comments' />
                                </Button>
                                <Label as='a' basic color='blue' pointing='left'>
                                    {commentCount}
                                </Label>
                            </Button>

                            {user && user.username === username && (
                                <DeleteButton postId={id} callback={() => navigate('/')} />
                            )}
                        </Card.Content>
                    </Card>

                    <Card fluid className='card'>
                        <Card.Content>
                            <Comment.Group>
                                <Header as='h3' dividing>
                                    Comments
                                </Header>

                                {comments.map(c => {
                                    return (
                                        <Comment key={c.id}>
                                            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                                            <Comment.Content>
                                                <Comment.Author>{c.username}</Comment.Author>
                                                <Comment.Metadata>
                                                    <div>{moment(c.createdAt).fromNow()}</div>
                                                    <div>
                                                        <Icon name='heart' color='teal' /> {c.likeCount}
                                                    </div>
                                                </Comment.Metadata>
                                                <Comment.Text>{c.body}</Comment.Text>
                                                <Comment.Actions>
                                                    <Comment.Action>
                                                        <LikeButtonSubtle
                                                            postId={id}
                                                            likes={c.likes}
                                                            likeCount={c.likeCount}
                                                            commentId={c.id}
                                                            subtle={true}
                                                        />
                                                    </Comment.Action>
                                                    <Comment.Action>
                                                        <DeleteButton
                                                            postId={id}
                                                            commentId={c.id}
                                                            subtle={true}
                                                        />
                                                    </Comment.Action>
                                                </Comment.Actions>
                                            </Comment.Content>
                                        </Comment>
                                    )
                                })}

                                {user && (
                                    <Form reply>
                                        <div className='ui input fluid'>
                                            <textarea
                                                type='text'
                                                name='comment'
                                                value={comment}
                                                onChange={event => setComment(event.target.value)}
                                                ref={commentInputRef}
                                                rows='2'
                                            />
                                        </div>
                                        <Button
                                            type='submit'
                                            content='Add Reply'
                                            labelPosition='left'
                                            icon='edit'
                                            color='teal'
                                            onClick={createComment}
                                            disabled={comment.trim() === ''}
                                        />
                                    </Form>
                                )}
                            </Comment.Group>
                        </Card.Content>
                    </Card>
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
                likes{
                    id
                    username
                }
                likeCount
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
                likes{
                    id
                    username
                }
                likeCount
            }
            commentCount
        }
    }
`


export default SinglePost;
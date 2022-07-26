import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react'
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import MyPopup from '../utils/MyPopup';

function PostCard({ post: { id, username, createdAt, body, likes, likeCount, comments, commentCount } }) {
    const { user } = useContext(AuthContext);

    const { loading, data } = useQuery(FETCH_USER_PROFILE, {
        update() {
            console.log("User profile has successfully been fetched");
        },
        variables: { username }
    })

    // if(data) {
    //     console.log("data is: ", data.getUserProfile);
    // } else {
    //     console.log('no data');
    // }

    return (
        <Card fluid className='postcard'>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                {loading ? (
                    <p>Loading Data...</p>
                ) : (
                    <>
                        <Card.Header as={Link} to={`/profiles/${data.getUserProfile.id}`}>{username}</Card.Header>
                        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                        <Card.Description>
                            {body}
                        </Card.Description>
                    </>
                )}

            </Card.Content>
            <Card.Content extra>
                {/* Like Button */}
                <LikeButton post={{ id, likes, likeCount }} />

                {/* Comment Button */}
                <MyPopup content='Comment on Post'>
                    <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                        <Button size='tiny' basic color='blue'>
                            <Icon name='comments' />
                        </Button>
                        <Label as='a' basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                </MyPopup>

                {/* Edit Button */}
                {user && user.username === username && (
                    <EditButton postId={id} body={body} />
                )}


                {/* Delete Button */}
                {user && user.username === username && (
                    <DeleteButton postId={id} />
                )}

            </Card.Content>
        </Card>
    )
}

const FETCH_USER_PROFILE = gql`
    query getUserProfile($username: String!) {
        getUserProfile(username: $username) {
            id
            username
            email
            phone
        }
    }
`

export default PostCard;
import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react'
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../utils/MyPopup';

function PostCard({ post: { id, username, createdAt, body, likes, likeCount, comments, commentCount } }) {

    const { user } = useContext(AuthContext);

    return (
        <Card fluid className='postcard'>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {/* Like Button */}
                <LikeButton post={{ id, likes, likeCount }} />

                {/* Comment Button */}
                <MyPopup content='Comment on Post'>
                    <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                        <Button basic color='blue'>
                            <Icon name='comments' />
                        </Button>
                        <Label as='a' basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                </MyPopup>


                {/* Delete Button */}
                {user && user.username === username && (
                    <DeleteButton postId={id} />
                )}

            </Card.Content>
        </Card>
    )
}

export default PostCard;
import React, { useEffect, useState, useContext } from "react";
import { Button, Icon, Label } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import MyPopup from "../utils/MyPopup";

function LikeButton({ post: { id, likes, likeCount } }) {
    const [liked, setLiked] = useState(false);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else setLiked(false);
    }, [likes, user]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    })

    const likeButton = user ? (
        liked ? (
            <Button color='teal'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button basic color='teal'>
                <Icon name='heart' />
            </Button >
        )
    ) : (
        <Button basic color='teal' as={Link} to='/login'>
            <Icon name='heart' />
        </Button>
    )

    return (
        <MyPopup content="Like Post">
            <Button as='div' labelPosition='right' onClick={likePost}>
                {likeButton}

                <Label as='a' basic color='teal' pointing='left'>
                    {likeCount}
                </Label>
            </Button>
        </MyPopup>
    )
}

const LIKE_POST_MUTATION = gql`
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

export default LikeButton;
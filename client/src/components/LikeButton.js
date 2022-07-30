import React, { useEffect, useState, useContext } from "react";
import { Button, Icon, Label } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import MyPopup from "../utils/MyPopup";

function LikeButton({ postId, likes, likeCount, commentId }) {
    const [liked, setLiked] = useState(false);
    const { user } = useContext(AuthContext);

    const mutation = commentId ? LIKE_COMMENT_MUTATION : LIKE_POST_MUTATION;

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else setLiked(false);
    }, [likes, user]);

    const [likePostorComment] = useMutation(mutation, {
        variables: { postId, commentId }
    })

    // Show filled or outlined button
    const likeButton = user ? (
        liked ? (
            <Button size='tiny' color='teal'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button size='tiny' basic color='teal'>
                <Icon name='heart' />
            </Button >
        )
    ) : (
        <Button size='tiny' basic color='teal' as={Link} to='/login'>
            <Icon name='heart' />
        </Button>
    )

    return (
        <MyPopup content="Like Post">
            <Button as='div' labelPosition='right' onClick={likePostorComment}>
                {likeButton}
                <Label basic color='teal' pointing='left'>
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

const LIKE_COMMENT_MUTATION = gql`
    mutation likeComment($postId: ID!, $commentId: ID!) {
        likeComment(postId: $postId, commentId: $commentId){
            id
            likes{
                id
                username
                createdAt
            }
            likeCount
        }
    }
`

export default LikeButton;
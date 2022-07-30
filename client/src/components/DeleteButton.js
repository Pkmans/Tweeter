import React, { useState, useContext } from "react";
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client'

import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { ThemeContext } from "../App";
import MyPopup from "../utils/MyPopup";

function DeleteButton({ postId, callback, commentId }) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { theme } = useContext(ThemeContext);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePostorComment] = useMutation(mutation, {
        
        // Update client-side cache to remove deleted post 
        update(proxy) {
            setConfirmOpen(false);

            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY,
                })
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: { getPosts: [...data.getPosts.filter(post => post.id !== postId)] }
                })
            }

            if (callback) callback();
        },
        variables: { postId, commentId }
    })

    return (
        <>
            <MyPopup content='Delete Post'>
                <Button size='tiny'
                    basic={theme === 'dark'}
                    color='red'
                    floated='right'
                    onClick={() => setConfirmOpen(true)}
                >
                    <Icon name='trash' />
                </Button>
            </MyPopup>

            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostorComment}
            />
        </>
    )

}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments{
                id 
                username 
                createdAt 
                body
            }
            commentCount
        }
    }
`

export default DeleteButton;
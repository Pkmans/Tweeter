import React from 'react';
import { useQuery } from '@apollo/client'
import { Comment, Icon } from 'semantic-ui-react';
import moment from 'moment';

import DeleteButton from './DeleteButton';
import LikeButtonSubtle from '../components/LikeButtonSubtle';
import { FETCH_USER_PROFILE } from '../utils/graphql';


function CommentCustom(props) {

    const {comment: c, postId} = props;

    const { loading, data : {getProfileByUsername} = {} } = useQuery(FETCH_USER_PROFILE, {
        variables: { username: c.username }
    })

    return (
        <Comment {...props}>
            {loading ? (
                <Icon loading name='spinner' size='big' />
            ) : (
                getProfileByUsername.picture ? (
                    <Comment.Avatar className='profile-picture' src={`http://localhost:5000/images/${c.username}/${getProfileByUsername.picture}`} />
                ) : (
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                )
            )}

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
                            postId={props.postId}
                            likes={c.likes}
                            likeCount={c.likeCount}
                            commentId={c.id}
                            subtle={true}
                        />
                    </Comment.Action>
                    <Comment.Action>
                        <DeleteButton
                            postId={postId}
                            commentId={c.id}
                            subtle={true}
                        />
                    </Comment.Action>
                </Comment.Actions>
            </Comment.Content>
        </Comment>
    );
}

export default CommentCustom;
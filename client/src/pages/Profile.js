import React, { useContext } from "react";
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { Card, Grid, Image, Icon, Statistic } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import EditButtonMultiple from "../components/EditButtonMultiple";
import UploadForm from "../components/UploadForm";
import { FETCH_USER_PROFILE, FETCH_STATS_QUERY } from '../utils/graphql';
import ProfileCard from '../components/ProfileCard';


function Profile() {
    const { username } = useParams();
    const { user } = useContext(AuthContext);

    const { data: { getProfileByUsername } = {} } = useQuery(FETCH_USER_PROFILE, {
        variables: { username }
    });

    const { data: { getStats } = {} } = useQuery(FETCH_STATS_QUERY, {
        variables: { username }
    })

    let profileMarkup;
    if (!getProfileByUsername) {
        profileMarkup = <Icon loading name='spinner' size='big' />
    } else {
        const { id, username, email, bio, phone, school, location, birthDate, relationship, picture } = getProfileByUsername;

        const statsRow1 = [
            { key: 'posts', label: 'Posts', value: `${getStats.postCount}` },
            { key: 'likes', label: 'Likes', value: `${getStats.likeCount}`},
            { key: 'comments', label: 'Comments', value: `${getStats.commentCount}` },
        ]


        profileMarkup = (
            <Grid className='page-container'>
                {/* Profile Picture */}
                <Grid.Column width={4}>
                    <Grid.Row>
                        <h1 style={{ textAlign: 'center' }}>{username}</h1>

                        {picture ? (
                            <Image className='profile-picture' src={`http://localhost:5000/images/${username}/${picture}`} alt='image' />
                        ) : (
                            <Image className='profile-picture' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                        )}

                        {username === user.username && (
                            <UploadForm username={username} profileId={id} />
                        )}

                    </Grid.Row>
                    <Grid.Row>
                        <Statistic.Group size='small' items={statsRow1}/>
                    </Grid.Row>
                </Grid.Column>

                {/* Profile Descriptions */}
                <Grid.Column width={12}>
                    <Card fluid className="card profile" >
                        <Card.Content>
                            <Card.Header>
                                Details
                                {user.username === username && (
                                    <EditButtonMultiple
                                        header='Details'
                                        body={{ phone, email, birthDate }}
                                        profileId={id}
                                        className='profile-edit-button'
                                    />
                                )}
                            </Card.Header>
                            <Card.Meta></Card.Meta>
                            <Card.Description>Phone: {phone}</Card.Description>
                            <Card.Description>Email: {email}</Card.Description>
                            <Card.Description>Date of Birth: {birthDate}</Card.Description>
                        </Card.Content>
                    </Card>

                    <ProfileCard
                        user={user}
                        username={username}
                        header='About Me'
                        description={bio}
                        section='bio'
                        profileId={id}
                    />

                    <ProfileCard
                        user={user}
                        username={username}
                        header='Education'
                        description={school}
                        section='school'
                        profileId={id}
                    />

                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <ProfileCard
                                    user={user}
                                    username={username}
                                    header='Relationship Status'
                                    description={relationship}
                                    section='relationship'
                                    profileId={id}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <ProfileCard
                                    user={user}
                                    username={username}
                                    header='Where I live'
                                    description={location}
                                    section='location'
                                    profileId={id}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid>
        )
    }

    return profileMarkup;
}

export default Profile;
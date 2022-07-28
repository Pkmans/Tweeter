import React, { useContext } from "react";
import { gql, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { Card, Grid, Image } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import EditButton from "../components/EditButton";
import EditButtonMultiple from "../components/EditButtonMultiple";
import UploadForm from "../components/UploadForm";
import { FETCH_PROFILE_QUERY } from '../utils/graphql';


function Profile() {
    const { profileId } = useParams();
    const { user } = useContext(AuthContext);



    const { data: { getProfile } = {}, error } = useQuery(FETCH_PROFILE_QUERY, {
        onError(err) {
            throw new Error(err);
        },
        variables: { profileId }
    });


    let profileMarkup;
    if (!getProfile) {
        profileMarkup = <p>Loading profile...</p>
    } else {
        const { id, username, email, bio, phone, school, location, birthDate, relationship, picture } = getProfile;

        profileMarkup = (
            <Grid className='page-container'>
                {/* Profile Picture */}
                <Grid.Column width={4}>
                    <Grid.Row>
                        {/* <Card fluid className="card">
                            <Card.Content> */}
                        {!picture ? (
                            <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                        ) : (
                            <Image className='profile-picture' src={`http://localhost:5000/images/${username}/${picture}`} alt='image' />
                        )}

                        {username === user.username && (
                            <UploadForm username={username} profileId={id} />
                        )}
                        {/* </Card.Content>
                        </Card> */}
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

                    <Card fluid className="card profile">
                        <Card.Content>
                            <Card.Header>
                                About Me
                                {user.username === username && (
                                    <EditButton 
                                    header='About Me'
                                    body={bio} 
                                    className='profile-edit-button' 
                                    profileId={id} 
                                    section='bio' 
                                    />
                                )}
                            </Card.Header>
                            <Card.Description>{bio}</Card.Description>
                        </Card.Content>
                    </Card>

                    <Card fluid className="card profile">
                        <Card.Content>
                            <Card.Header>
                                Education
                                {user.username === username && (
                                    <EditButton 
                                    header='Education'
                                    className='profile-edit-button' 
                                    profileId={id} 
                                    section='school' 
                                    body={school} />
                                )}
                            </Card.Header>
                            <Card.Description>{school}</Card.Description>
                        </Card.Content>
                    </Card>

                    {/* 1 Row 3 column Split */}
                    <Grid>
                        <Grid.Row columns={2}>
                            <Grid.Column>
                                <Card fluid className="card profile">
                                    <Card.Content>
                                        <Card.Header>
                                            Relationship Status
                                            {user.username === username && (
                                                <EditButton header='Relationship Status' className='profile-edit-button' profileId={id} section='relationship' body={relationship} />
                                            )}
                                        </Card.Header>
                                        <Card.Description>{relationship}</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>

                            <Grid.Column>
                                <Card fluid className="card profile">
                                    <Card.Content>
                                        <Card.Header>
                                            Where I live
                                            {user.username === username && (
                                                <EditButton header='Where I live' className='profile-edit-button' profileId={id} section='location' body={location} />
                                            )}
                                        </Card.Header>
                                        <Card.Description>{location}</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>

                        </Grid.Row>
                    </Grid>
                    {/* 1 Row 3 column Split */}

                </Grid.Column>
            </Grid>
        )
    }

    return profileMarkup;
}

export default Profile;
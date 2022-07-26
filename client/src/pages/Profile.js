import React from "react";
import { gql, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { Button, Card, Icon, Label, Grid, Image, Form } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import EditButton from "../components/EditButton";
import EditButtonMultiple from "../components/EditButtonMultiple";

function Profile() {
    const { profileId } = useParams();

    const { data: { getProfile } = {}, error } = useQuery(FETCH_PROFILE_QUERY, {
        variables: { profileId }
    })

    if (error) {
        throw new Error(error);
    }

    let profileMarkup;
    if (!getProfile) {
        profileMarkup = <p>Loading profile...</p>
    } else {
        const { id, username, email, bio, phone, school, location, birthDate, relationship } = getProfile;

        console.log(relationship);

        profileMarkup = (
            <Grid>
                {/* Profile Picture */}
                <Grid.Column width={3}>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                </Grid.Column>

                {/* Profile Descriptions */}
                <Grid.Column width={13}>
                    <Card fluid className="card">
                        <Card.Content>
                            <Card.Header>
                                {username}
                                <EditButtonMultiple
                                    body={{ phone, email, birthDate }}
                                    profileId={id}
                                    className='profile-edit-button'
                                />
                            </Card.Header>
                            <Card.Meta></Card.Meta>
                            <Card.Description>Phone: {phone}</Card.Description>
                            <Card.Description>Email: {email}</Card.Description>
                            <Card.Description>Date of Birth: {birthDate}</Card.Description>
                        </Card.Content>
                    </Card>

                    <Card fluid className="card">
                        <Card.Content>
                            <Card.Header>
                                About Me
                                <EditButton className='profile-edit-button' profileId={id} section='bio' body={bio} />
                            </Card.Header>
                            <Card.Description>{bio}</Card.Description>
                        </Card.Content>
                    </Card>

                    {/* 1 Row 2 column Split */}
                    <Grid>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <Card fluid className="card">
                                    <Card.Content>
                                        <Card.Header>
                                            Education
                                            <EditButton className='profile-edit-button' profileId={id} section='school' body={school} />
                                        </Card.Header>
                                        <Card.Description>{school}</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>

                            <Grid.Column>
                                <Card fluid className="card">
                                    <Card.Content>
                                        <Card.Header>
                                            Where I live
                                            <EditButton className='profile-edit-button' profileId={id} section='location' body={location} />
                                        </Card.Header>
                                        <Card.Description>{location}</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>

                            <Grid.Column>
                                <Card fluid className="card">
                                    <Card.Content>
                                        <Card.Header>
                                            Relationship Status
                                            <EditButton className='profile-edit-button' profileId={id} section='relationship' body={relationship} />
                                        </Card.Header>
                                        <Card.Description>{relationship}</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    {/* 1 Row 2 column Split */}

                </Grid.Column>
            </Grid>
        )
    }

    return profileMarkup;
}

const FETCH_PROFILE_QUERY = gql`
    query getProfile($profileId: ID!) {
        getProfile(profileId: $profileId) {
            id
            username
            email
            bio
            phone
            school
            location
            birthDate
            relationship
        }
    }
`

export default Profile;
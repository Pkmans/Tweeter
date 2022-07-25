import React from "react";
import { gql, useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import { Button, Card, Icon, Label, Grid, Image, Form } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

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
        const { id, username, email, bio, phone, school, location, birthDate } = getProfile;

        profileMarkup = (
            <Grid>
                <Grid.Column width={3}>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                </Grid.Column>
                <Grid.Column width={13}>
                    <Card fluid className="card">
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta></Card.Meta>
                            <Card.Description>Phone: {phone}</Card.Description>
                            <Card.Description>Email: {email}</Card.Description>
                            <Card.Description>Date of Birth: {birthDate}</Card.Description>
                        </Card.Content>
                    </Card>

                    <Card fluid className="card">
                        <Card.Content>
                            <Card.Header>About Me</Card.Header>
                            <Card.Description>{bio}</Card.Description>
                        </Card.Content>
                    </Card>

                    <Card fluid className="card">
                        <Card.Content>
                            <Card.Header>Education</Card.Header>
                            <Card.Description>{school}</Card.Description>
                        </Card.Content>
                    </Card>

                    <Card fluid className="card">
                        <Card.Content>
                            <Card.Header>Where I live</Card.Header>
                            <Card.Description>{location}</Card.Description>
                        </Card.Content>
                    </Card>
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
        }
    }
`

export default Profile;
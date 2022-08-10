import React, { useEffect, useState, useRef, useContext } from 'react';
import { uploadFile } from 'react-s3';
import { Icon } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

import CropEasy from './crop/CropEasy';
import {ThemeContext} from '../App';

window.Buffer = window.Buffer || require("buffer").Buffer;

const S3_BUCKET = 'tweeter-project-aaronlam';
const REGION = 'us-west-2';
const ACCESS_KEY = '***REMOVED***';
const SECRET_ACCESS_KEY = '***REMOVED***';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}

function UploadImageToS3WithReactS3({ username, profileId }) {
    const [photoURL, setPhotoURL] = useState(username?.photoURL);
    const [file, setFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const [updatePicture] = useMutation(UPDATE_PROFILE_PICTURE);

    const firstUpdate = useRef(true);
    const {theme} = useContext(ThemeContext);

    async function handleFileInput(e) {
        const file = e.target.files[0];

        if (file) {
            setPhotoURL(URL.createObjectURL(file));
            setModalOpen(true);
        }
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        uploadFile(file, config)
            .then(() => {
                updatePicture({ variables: { profileId, photoName: file.name } });
            })
            .catch(err => console.error(err))
    }, [file])

    return (
        modalOpen ? (
            <CropEasy
                photoURL={photoURL}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                setFile={setFile}
                setPhotoURL={setPhotoURL}
            />
        ) : (
            <div className='profile-pic-button'>
                <label htmlFor='file-upload-s3' className='custom-file-upload'>
                    <Icon inverted={theme === 'dark'} name='picture' />
                    <p className='inline-text'>Change Picture</p>
                </label >
                <input type='file' onChange={handleFileInput} id="file-upload-s3" style={{ width: 200 }}/>
            </div>
        )

    )
}

const UPDATE_PROFILE_PICTURE = gql`
    mutation updateProfilePicture($profileId: ID!, $photoName: String!) {
        updateProfilePicture(profileId: $profileId, photoName: $photoName) {
            id
            picture
        }
    }
`

export default UploadImageToS3WithReactS3;
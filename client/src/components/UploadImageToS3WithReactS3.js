import React, { useState } from 'react';
import { uploadFile } from 'react-s3';
import { Icon } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';

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

const UploadImageToS3WithReactS3 = ({ profileId }) => {

    const [selectedFile, setSelectedFile] = useState(null);

    const [updatePicture] = useMutation(UPDATE_PROFILE_PICTURE);

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0]);
    }

    async function handleUpload(file) {
        uploadFile(file, config)
            .then(data => {
                console.log(data);

                // call mutation
                updatePicture({ variables: { profileId, photoName: data.key } });
            })
            .catch(err => console.error(err))
    }

    return <div>
        <label htmlFor='file-upload-s3' className='custom-file-upload'>
            <Icon name='picture' />
            <p className='inline-text'>Change Picture</p>
        </label>
        <input type='file' onChange={handleFileInput} id="file-upload-s3" />
        <button onClick={() => handleUpload(selectedFile)}> Upload to S3</button>
    </div>
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
import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Icon } from 'semantic-ui-react';

import { FETCH_PROFILE_QUERY } from '../utils/graphql';

function UploadForm({ profileId, username }) {

    const [uploadFile] = useMutation(UPLOAD_FILE, {
        
        // Update client-side cache to display uploaded file
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_PROFILE_QUERY,
                variables: { profileId }
            })
            proxy.writeQuery({
                query: FETCH_PROFILE_QUERY,
                data: { getProfile: { ...data.getProfile, picture: result.data.uploadFile.filename } }
            })
        },
        onCompleted(data) {
            console.log(data);
        }
    })

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        uploadFile({ variables: { file, username, profileId } });
    }

    return (
        <div className='profile-pic-button'>
            <label htmlFor='file-upload' className='custom-file-upload'>
                <Icon name='picture'/> Change Picture
            </label>
            <input type='file' onChange={handleFileChange} id="file-upload" style={{ width: 200 }} />
        </div>
    );
}

const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!, $username: String!, $profileId: ID!) {
        uploadFile(file: $file, username: $username, profileId: $profileId) {
            url
            filename
        }
    }
`

export default UploadForm;
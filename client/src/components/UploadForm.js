import React from 'react';
import {useMutation, gql} from '@apollo/client';

function UploadForm() {
 
    const [uploadFile, {error}] = useMutation(UPLOAD_FILE, {
        onCompleted(data) {
            console.log(data);
        }
    })
    

    function handleFileChange(e) {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        if (!file) return;

        uploadFile({variables: {file}});
    }

    return (
        <div>
            <h2>Upload File</h2>
            <input type="file" onChange={handleFileChange} />
        </div>
    );
}

const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!) {
        uploadFile(file: $file) {
            url
        }
    }
`

export default UploadForm;
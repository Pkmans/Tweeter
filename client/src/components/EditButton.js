import React, { useState, useContext } from "react";
import { Modal, Form, Button } from "semantic-ui-react";
import { gql, useMutation } from '@apollo/client';

import useForm from "../utils/hooks";
import { ThemeContext } from "../App";

function EditButton({ postId, body, profileId, section, className, header }) {
    const [open, setOpen] = useState(false);
    const { theme } = useContext(ThemeContext);

    const isDarkTheme = theme === 'dark';

    const { onChange, onSubmit, values } = useForm(editCallback, {
        body
    })

    const mutation = profileId ? EDIT_PROFILE_MUTATION : EDIT_POST_MUTATION;

    const [editPostorProfile] = useMutation(mutation, {
        update() {
            setOpen(false);
        },
        variables: { postId, profileId, body: values.body, section }
    })

    function editCallback() {
        editPostorProfile();
    }

    return (
        <Modal
            basic={isDarkTheme}
            as={Form}
            onSubmit={onSubmit}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='tiny'
            trigger={
                <Button
                    inverted={isDarkTheme}
                    className={className}
                    circular
                    size='tiny'
                    color='blue'
                    icon='pencil'
                />}
        >
            {/* Header */}
            <Modal.Header className='modal-components' content={header} />

            {/* Content */}
            <Modal.Content className='modal-components'>
                <Form inverted={isDarkTheme}>
                    <Form.Field>
                        <div className='field' >
                            <label>Update to: </label>
                            <div className='ui input'>
                                <textarea name='body' type='text' value={values.body} onChange={onChange}/>
                            </div>
                        </div>
                    </Form.Field>
                </Form>
            </Modal.Content>

            {/* Actions */}
            <Modal.Actions className='modal-components'>
                <Button inverted={isDarkTheme} color="red" icon="times" content="Cancel" onClick={() => setOpen(false)} />
                <Button inverted={isDarkTheme} type="submit" color="green" icon="save" content="Save" />
            </Modal.Actions>

        </Modal>
    );
}

const EDIT_POST_MUTATION = gql`
    mutation editPost($postId: ID!, $body: String!) {
        editPost(postId: $postId, body: $body) {
            id
            body
        }
    }
`
const EDIT_PROFILE_MUTATION = gql`
    mutation editProfile($profileId: ID!, $section: String!, $body: String!) {
        editProfile(profileId: $profileId, section: $section, body: $body) {
            id
            username
            email
            phone
            school
            location
            bio
            birthDate
            relationship
        }
    }
`

export default EditButton
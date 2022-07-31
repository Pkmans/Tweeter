import React, { useState, useContext } from "react";
import { Modal, Form, Button, Icon } from "semantic-ui-react";
import { gql, useMutation } from '@apollo/client';

import useForm from "../utils/hooks";
import { ThemeContext } from "../App";

function EditButton({ postId, body, profileId, section, className, header}) {
    const [open, setOpen] = useState(false);
    const { theme } = useContext(ThemeContext);

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
            as={Form}
            onSubmit={onSubmit}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Button className={className} size='tiny' color='instagram'>
                    <Icon name='pencil' />
                </Button>
            }
        >
            {/* Header */}
            <Modal.Header className='modal-components' content={header} />

            {/* Content */}
            <Modal.Content className='modal-components'>
                <Form>
                    <Form.Field >
                        <Form.Input label='Post message' type='text' name='body' onChange={onChange} value={values.body} />
                    </Form.Field>
                </Form>
            </Modal.Content>

            {/* Actions */}
            <Modal.Actions className='modal-components'>
                <Button color="red" icon="times" content="Cancel" onClick={() => setOpen(false)} />
                <Button type="submit" color="green" icon="save" content="Save" />
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
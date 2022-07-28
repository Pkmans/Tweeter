import React, { useState } from "react";
import { Modal, Form, Button, Icon } from "semantic-ui-react";
import { gql, useMutation } from '@apollo/client';

import useForm from "../utils/hooks";

function EditButtonMultiple({ postId, body, profileId, className, header}) {
    const [open, setOpen] = useState(false);
    const { onChange, onSubmit, values } = useForm(editCallback, {
        phone: body.phone,
        email: body.email,
        birthDate: body.birthDate
    })

    const [editProfile] = useMutation(EDIT_MULTIPLE_PROFILE_MUTATION, {
        update() {
            setOpen(false);
        },
        variables: { postId, profileId, phone: values.phone, email: values.email, birthDate: values.birthDate }
    })

    function editCallback() {
        editProfile();
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
            <Modal.Header className='modal-components' content={header} />
            <Modal.Content className='modal-components'>
                <Form>
                    <Form.Field>
                        <Form.Input label='Phone' type='text' name='phone' onChange={onChange} value={values.phone} />
                        <Form.Input label='Email' type='text' name='email' onChange={onChange} value={values.email} />
                        <Form.Input label='Date of Birth' type='text' name='birthDate' onChange={onChange} value={values.birthDate} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions className='modal-components'>
                <Button color="red" icon="times" content="Cancel" onClick={() => setOpen(false)} />
                <Button type="submit" color="green" icon="save" content="Save" />
            </Modal.Actions>

        </Modal>

    );
}

const EDIT_MULTIPLE_PROFILE_MUTATION = gql`
    mutation editMultipleProfile($profileId: ID!, $phone: String!, $email: String!, $birthDate: String!) {
        editMultipleProfile(profileId: $profileId, phone: $phone, email: $email, birthDate: $birthDate) {
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

export default EditButtonMultiple
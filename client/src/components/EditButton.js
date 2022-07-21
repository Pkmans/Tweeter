import React, { useState } from "react";
import { Modal, Form, Header, Button, Icon } from "semantic-ui-react";
import { gql, useMutation } from '@apollo/client';

import useForm from "../utils/hooks";

function EditButton({ post: { id, body } }) {     
    const [open, setOpen] = useState(false);

    const { onChange, onSubmit, values } = useForm(editPostCallback, {
        body: body
    })

    const [editPost] = useMutation(EDIT_POST_MUTATION, {
        variables: { postId: id, newBody: values.body }
    })

    function editPostCallback() {
        editPost();
        setOpen(false);
    }

    return (
        <Modal
            as={Form}
            onSubmit={onSubmit}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Button size='tiny' color='instagram'>
                    <Icon name='pencil' />
                </Button>
            }
        >
            <Modal.Header content='Editing Post' />
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <Form.Input label='Post message' type='text' name='body' onChange={onChange} value={values.body} />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" icon="times" content="Cancel" onClick={() => setOpen(false)} />
                <Button type="submit" color="green" icon="save" content="Save" />
            </Modal.Actions>

        </Modal>

    );
}

const EDIT_POST_MUTATION = gql`
    mutation editPost($postId: ID!, $newBody: String!) {
        editPost(postId: $postId, newBody: $newBody) {
            id
            body
        }
    }
`

export default EditButton
import React, {useContext, useState } from "react";
import { Button, Form } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from "../context/auth";
import useForm from "../utils/hooks";

function Register() {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            context.login(result.data.register);
            navigate('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    })

    function registerUser() {
        addUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate loading={loading ? true : false}>
                <h1>Register</h1>
                <Form.Input
                    label='Username'
                    type='text'
                    placeholder='Username...'
                    name='username'
                    value={values.username}
                    onChange={onChange}
                    error={errors.username ? true : false}
                />
                <Form.Input
                    label='Email'
                    type='email'
                    placeholder='Email Address...'
                    name='email'
                    value={values.email}
                    onChange={onChange}
                    error={errors.email ? true : false}
                />
                <Form.Input
                    label='Password'
                    type='password'
                    placeholder='Password...'
                    name='password'
                    value={values.password}
                    onChange={onChange}
                    error={errors.password ? true : false}
                />
                <Form.Input
                    label='Confirm Password'
                    type='password'
                    placeholder='Confirm Password...'
                    name='confirmPassword'
                    value={values.confirmPassword}
                    onChange={onChange}
                    error={errors.confirmPassword ? true : false}
                />
                <Button type='submit' primary>
                    Register
                </Button>
            </Form>

            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            username
            email
            createdAt
            token
        }
    }
`

export default Register;
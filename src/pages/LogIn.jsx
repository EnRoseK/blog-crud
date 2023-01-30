import axios from 'axios';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = () => {
        const userInfo = {
            email,
            password,
        };

        axios
            .post(`http:///localhost:8000/signin`, userInfo)
            .then((res) => {
                localStorage.setItem('token', res.data.body);
                navigate('/login/success');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='w-100 min-vh-100 d-flex align-items-center justify-content-center flex-column'>
            <div className='col-sm-4'>
                <div className='card'>
                    <div className='card-body'>
                        <Form
                            onSubmit={(e) => {
                                e.preventDefault();
                                submit();
                            }}
                        >
                            <Form.Group className='mb-3'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    value={email}
                                    type='email'
                                    placeholder='Enter email'
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <div className='d-flex justify-content-end'>
                                <Button variant='primary' type='submit'>
                                    Sign in
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

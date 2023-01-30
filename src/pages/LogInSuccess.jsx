import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LogInSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .post('http://localhost:8000/users/me')
            .then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate('/');
            })
            .catch((err) => console.log(err));
    }, []);

    return <></>;
};

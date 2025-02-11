import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
    API_ENDPOINT,
    FORM_NAME,
    INPUT_NAME,
    INPUT_TYPE,
    PLACEHOLDER,
    TOKEN,
    URL,
} from '../config';

import { fetchHeader, handleChange, initialForm, postForm } from '../utils';

import '../styles/user.css'

export const User = (props) => {
    const { setIsLoggedIn } = props;

    const [currentUrl, setCurrentUrl] = useState('');

    const [error, setError] = useState(null);

    const [form, setForm] = useState(initialForm);
    const { username, password } = form;

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setForm(initialForm);

        setCurrentUrl(location.pathname);
    }, [location]);

    useEffect(() => {
        if(!error) return

        setError(null);
    }, [form]);

    const setPageType = () => {
        if (currentUrl === URL.LOGIN) {
            title = FORM_NAME.LOGIN;
            endpoint = API_ENDPOINT.LOGIN;
        }

        if (currentUrl === URL.REGISTER) {
            title = FORM_NAME.REGISTER;
            endpoint = API_ENDPOINT.REGISTER;
        }
    };

    let title;
    let endpoint;
    if (currentUrl) setPageType();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await postForm(endpoint, fetchHeader, form, setError);

        if (data) {
            localStorage.setItem(TOKEN, data);

            setIsLoggedIn(true);

            navigate(URL.MOVIES);
        }
    };

    return (
        <>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type={INPUT_TYPE.TEXT}
                    name={INPUT_NAME.USERNAME}
                    placeholder={PLACEHOLDER.USERNAME}
                    value={username}
                    onChange={(event) => handleChange(event, form, setForm)}
                    required
                />
                <input
                    type={INPUT_TYPE.PASSWORD}
                    name={INPUT_NAME.PASSWORD}
                    placeholder={PLACEHOLDER.PASSWORD}
                    value={password}
                    onChange={(event) => handleChange(event, form, setForm)}
                    required
                />
                <button type={INPUT_TYPE.SUBMIT}>Login</button>
            </form>
            {error && (
                <p className='error'>{error}</p>
            )}
        </>
    );
};

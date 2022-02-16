import { API_URL } from './config';

export const initialForm = {
    username: '',
    password: '',
};

export const handleChange = (event, form, setForm) => {
    const name = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [name]: value });
};

export const fetchConfig = (headers, form) => {
    return {
        method: 'POST',
        headers,
        body: JSON.stringify(form),
    };
};
export const fetchHeader = { 'Content-Type': 'application/json' };

export const postForm = async (endpoint, headers, form, setError) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, fetchConfig(headers, form));

        if (!response.ok) return setError(await response.json());

        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

import { useState } from 'react';

import { Login } from './components/Login';
import { Movie } from './components/Movie';
import { Register } from './components/Register';

import './App.css';

const apiUrl = 'http://localhost:4000';

function App() {
    const initialForm = {
        username: '',
        password: '',
    };

    const initialMovie = {
        title: '',
        description: '',
        runtimeMins: '',
    };

    const [registerForm, setRegisterForm] = useState(initialForm);
    const [loginForm, setLoginForm] = useState(initialForm);
    const [newMovie, setNewMovie] = useState(initialMovie);

    console.log(`state`, { registerForm, loginForm, newMovie });

    const postForm = async (endpoint, method, body) => {
        const response = await fetch(`${apiUrl}/${endpoint}`, config(method, body));
        const data = await response.json();
        return data;
    };

    const config = (method, body) => {
        return {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };
    };

    const handleChange = (event, formType) => {
        const name = event.target.name;
        const value = event.target.value;

        if (formType === 'register') setRegisterForm({ ...registerForm, [name]: value });
        if (formType === 'login') setLoginForm({ ...loginForm, [name]: value });
        if (formType === 'movie') setNewMovie({ ...newMovie, [name]: value });
    };

    const handleSubmit = async (event, endpoint, method, body) => {
        event.preventDefault();

        const data = await postForm(endpoint, method, body);

        console.log(data);
    };

    return (
        <div className="App">
            <Register
                registerForm={registerForm}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <Login
                loginForm={loginForm}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <Movie
                newMovie={newMovie}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default App;
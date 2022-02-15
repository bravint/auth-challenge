import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Home } from './components/Home';
import { Login } from './components/Login';
import { Movie } from './components/Movie';
import { Register } from './components/Register';

import './App.css';

const apiUrl = 'http://localhost:4000';

export const App = () => {
    const initialForm = {
        username: '',
        password: '',
    };

    const initialMovie = {
        title: '',
        description: '',
        runtimeMins: '',
    };

    const [register, setRegister] = useState(initialForm);
    const [login, setLogin] = useState(initialForm);
    const [movie, setMovie] = useState(initialMovie);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [movieList, setMovieList] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) setIsLoggedIn(true);
    }, [isLoggedIn]);

    const postForm = async (endpoint, headers, body) => {
        try {
            const response = await fetch(
                `${apiUrl}/${endpoint}`,
                config(headers, body)
            );

            if (!response.ok) {
                console.log(await response.json());
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const config = (headers, body) => {
        return {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        };
    };

    const handleChange = (event, formType) => {
        const name = event.target.name;
        const value = event.target.value;

        if (formType === 'register') setRegister({ ...register, [name]: value });

        if (formType === 'login') setLogin({ ...login, [name]: value });

        if (formType === 'movie') setMovie({ ...movie, [name]: value });
    };

    const handleSubmit = async (event, endpoint, body) => {
        let headers = { 'Content-Type': 'application/json' };

        if (endpoint === 'movie') {
            headers = {
                ...headers,
                Authorization: localStorage.getItem('token'),
            };
        }

        event.preventDefault();

        const data = await postForm(endpoint, headers, body);

        if (endpoint !== 'movie' && data) {
            localStorage.setItem('token', data);

            clearForms();

            setIsLoggedIn(true);

            const response = await fetch (`${apiUrl}/movie`)
            const movies = await response.json();
            setMovieList(movies)

            navigate('/movies');
        }

        if (endpoint == 'movie' && data) setMovieList(data)
        
        
    };

    const HandleLogout = () => {
        localStorage.clear();

        clearForms();

        setIsLoggedIn(false);

        navigate('/');
    };

    const clearForms = () => {
        setRegister(initialForm);
        setLogin(initialForm);
        setMovie(initialMovie);
    };

    return (
        <div className="App">
            {!isLoggedIn && (
                <>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home isLoggedIn={isLoggedIn} />}
                        />
                        <Route
                            path="register"
                            element={
                                <Register
                                    register={register}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                />
                            }
                        />
                        <Route
                            path="login"
                            element={
                                <Login
                                    login={login}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                />
                            }
                        />
                        <Route
                            path="*"
                            element={<Home isLoggedIn={isLoggedIn} />}
                        />
                    </Routes>
                </>
            )}
            {isLoggedIn && (
                <>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home isLoggedIn={isLoggedIn} />}
                        />
                        <Route
                            path="movies"
                            element={
                                <Movie
                                    movie={movie}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    movieList={movieList}
                                />
                            }
                        />
                        <Route
                            path="*"
                            element={<Home isLoggedIn={isLoggedIn} />}
                        />
                    </Routes>
                    <br></br>
                    <button onClick={HandleLogout}>Logout</button>
                </>
            )}
        </div>
    );
};

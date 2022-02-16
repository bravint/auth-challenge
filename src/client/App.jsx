import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Header } from './components/Header';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Movie } from './components/Movie';
import { Register } from './components/Register';

import { API_URL, API_ENDPOINT, FORM_NAME, TOKEN, URL } from './config';

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
    const [movieList, setMovieList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem(TOKEN)) setIsLoggedIn(true);
    }, [isLoggedIn]);

    const postForm = async (endpoint, headers, body) => {
        try {
            const response = await fetch(
                `${API_URL}${endpoint}`,
                config(headers, body)
            );

            if (!response.ok) console.log(await response.json());

            return await response.json();
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

        if (formType === FORM_NAME.REGISTER) setRegister({ ...register, [name]: value });
        if (formType === FORM_NAME.LOGIN) setLogin({ ...login, [name]: value });
        if (formType === FORM_NAME.MOVIE) setMovie({ ...movie, [name]: value });
    };

    const handleSubmit = async (event, endpoint, body) => {
        let headers = { 'Content-Type': 'application/json' };

        if (endpoint === API_ENDPOINT.MOVIE) {
            headers = {
                ...headers,
                Authorization: localStorage.getItem(TOKEN),
            };
        }

        event.preventDefault();

        const data = await postForm(endpoint, headers, body);

        if (endpoint !== API_ENDPOINT.MOVIE && data) {
            localStorage.setItem(TOKEN, data);

            clearForms();

            setIsLoggedIn(true);

            const response = await fetch(`${API_URL}${API_ENDPOINT.MOVIE}`);
            const movies = await response.json();
            setMovieList(movies);

            navigate(URL.MOVIES);
        }

        if (endpoint === API_ENDPOINT.MOVIE && data) {
            setMovieList(data);
            setMovie(initialMovie);
        }
    };

    const HandleLogout = () => {
        localStorage.removeItem(TOKEN);

        clearForms();

        setIsLoggedIn(false);

        navigate(URL.HOME);
    };

    const clearForms = () => {
        setRegister(initialForm);
        setLogin(initialForm);
        setMovie(initialMovie);
    };

    return (
        <div className="App">
            <Header 
                isLoggedIn={isLoggedIn} 
                HandleLogout={HandleLogout} 
            />
            {!isLoggedIn && (
                <>
                    <Routes>
                        <Route
                            path={URL.REGISTER}
                            element={
                                <Register
                                    register={register}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                />
                            }
                        />
                        <Route
                            path={URL.LOGIN}
                            element={
                                <Login
                                    login={login}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                />
                            }
                        />
                        <Route 
                            path={URL.HOME} 
                            element={<Home />} 
                        />
                        <Route 
                            path="*" 
                            element={<Home />} 
                        />
                    </Routes>
                </>
            )}
            {isLoggedIn && (
                <>
                    <Routes>
                        <Route
                            path={URL.MOVIES}
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
                            path={URL.HOME} 
                            element={<Home />} 
                        />
                        <Route 
                            path="*" 
                            element={<Home />} 
                        />
                    </Routes>
                </>
            )}
        </div>
    );
};

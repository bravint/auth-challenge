import { useState, useEffect } from 'react';

import {
    API_ENDPOINT,
    API_URL,
    INPUT_NAME,
    INPUT_TYPE,
    PLACEHOLDER,
    TOKEN,
} from '../config';

import { fetchHeader, handleChange, postForm } from '../utils';

export const Movie = () => {
    const initialForm = {
        title: '',
        description: '',
        runtimeMins: '',
    };

    const [form, setForm] = useState(initialForm);
    const [movieList, setMovieList] = useState([]);

    const { title, description, runtimeMins } = form;

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch(`${API_URL}${API_ENDPOINT.MOVIE}`);
            const data = await response.json();
            setMovieList(data);
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        setForm(initialForm);
    }, [movieList]);

    const handleSubmit = async (event, endpoint) => {
        event.preventDefault();

        let headers = {
            ...fetchHeader,
            Authorization: localStorage.getItem(TOKEN),
        };

        const fetchedMovies = await postForm(endpoint, headers, form);

        setMovieList(fetchedMovies);
    };

    return (
        <>
            <h2>Create a Movie</h2>
            <form onSubmit={(event) => handleSubmit(event, API_ENDPOINT.MOVIE)}>
                <input
                    type={INPUT_TYPE.TEXT}
                    name={INPUT_NAME.TITLE}
                    placeholder={PLACEHOLDER.TITLE}
                    value={title}
                    onChange={(event) => handleChange(event, form, setForm)}
                />
                <input
                    type={INPUT_TYPE.TEXT}
                    name={INPUT_NAME.DESC}
                    placeholder={PLACEHOLDER.DESC}
                    value={description}
                    onChange={(event) => handleChange(event, form, setForm)}
                />
                <input
                    type={INPUT_TYPE.TEXT}
                    name={INPUT_NAME.RUNTIME}
                    placeholder={PLACEHOLDER.RUNTIME}
                    value={runtimeMins}
                    onChange={(event) => handleChange(event, form, setForm)}
                />
                <button type={INPUT_TYPE.SUBMIT}>Create Movie</button>
            </form>

            <h2>Movie List</h2>
            <ul>
                {movieList.map((movie) => {
                    const { id, title, description, runtimeMins } = movie;
                    return (
                        <li key={id}>
                            <h3>{title}</h3>
                            <p>{description}</p>
                            <p>{runtimeMins}</p>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

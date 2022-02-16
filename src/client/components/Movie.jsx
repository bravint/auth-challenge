import { API_ENDPOINT, FORM_NAME, PLACEHOLDER } from '../config';

export const Movie = (props) => {
    const { movie, handleChange, handleSubmit, movieList } = props;

    const { title, description, runtimeMins } = movie;

    return (
        <>
            <h2>Create a Movie</h2>
            <form
                onSubmit={(event) => handleSubmit(event, API_ENDPOINT.MOVIE, movie)}
            >
                <input
                    type="text"
                    name="title"
                    placeholder={PLACEHOLDER.TITLE}
                    value={title}
                    onChange={(event) => handleChange(event, FORM_NAME.MOVIE)}
                />
                <input
                    type="text"
                    name="description"
                    placeholder={PLACEHOLDER.DESC}
                    value={description}
                    onChange={(event) => handleChange(event, FORM_NAME.MOVIE)}
                />
                <input
                    type="text"
                    name="runtimeMins"
                    placeholder={PLACEHOLDER.RUNTIME}
                    value={runtimeMins}
                    onChange={(event) => handleChange(event, FORM_NAME.MOVIE)}
                />
                <button type="submit">Create Movie</button>
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

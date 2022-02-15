export const Movie = (props) => {
    const { movie, handleChange, handleSubmit, movieList } = props;

    console.log(`movieList`, movieList )

    return (
        <>
            <h2>Create a Movie</h2>
            <form onSubmit={(event) => handleSubmit(event, 'movie', movie)}>
                <input
                    type="text"
                    name="title"
                    placeholder="enter title"
                    value={movie.title}
                    onChange={(event) => handleChange(event, 'movie')}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="enter description"
                    value={movie.description}
                    onChange={(event) => handleChange(event, 'movie')}
                />
                <input
                    type="text"
                    name="runtimeMins"
                    placeholder="enter runtime (mins)"
                    value={movie.runtimeMins}
                    onChange={(event) => handleChange(event, 'movie')}
                />
                <button type="submit">Create Movie</button>
            </form>

            <h2>Movie List</h2>
            <ul>
                {movieList.map((movie) => {
                    return (
                        <li key={movie.id}>
                            <h3>{movie.title}</h3>
                            <p>{movie.description}</p>
                            <p>{movie.runtimeMins}</p>
                        </li>
                    );
                })}
            </ul>

        </>
    );
};

export const Movie = (props) => {
    const {movie, handleChange, handleSubmit} = props

    return (
        <>
            <h2>Movie</h2>
            <form onSubmit={event => handleSubmit(event, 'movie', movie)}>
                <input type="text" name="title" placeholder="enter title" value={movie.title} onChange={event => handleChange(event, 'movie')} />
                <input type="text" name="description" placeholder="enter description" value={movie.description} onChange={event => handleChange(event, 'movie')} />
                <input type="text" name="runtimeMins" placeholder="enter runtime (mins)" value={movie.runtimeMins} onChange={event => handleChange(event, 'movie')} />
                <button type="submit">Create Movie</button>
            </form>
        </>
    );
};

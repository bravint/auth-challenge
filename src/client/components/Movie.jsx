export const Movie = (props) => {
    const {newMovie, handleChange, handleSubmit} = props

    return (
        <>
            <h2>Movie</h2>
            <form onSubmit={event => handleSubmit(event, 'user/movie', 'POST', newMovie)}>
                <input type="text" name="title" placeholder="enter title" value={newMovie.title} onChange={event => handleChange(event, 'movie')} />
                <input type="text" name="description" placeholder="enter description" value={newMovie.description} onChange={event => handleChange(event, 'movie')} />
                <input type="text" name="runtimeMins" placeholder="enter runtime (mins)" value={newMovie.runtimeMins} onChange={event => handleChange(event, 'movie')} />
                <button type="submit">Create Movie</button>
            </form>
        </>
    );
};

const jwt = require('jsonwebtoken');

const { prisma, secret } = require('../utils');

const getAllMovies = async () => {
    return await prisma.movie.findMany({});
};

const getMovies = async (req, res) => {
    const fetchedMovies = await getAllMovies();

    res.json(fetchedMovies);
};

const createMovie = async (req, res) => {
    let { title, description, runtimeMins } = req.body;

    const token = req.headers.authorization;

    if (!token) return res.status(401).json('user not logged in');

    try {
        jwt.verify(token, secret);
    } catch (error) {
        return res.status(401).json(error.message);
    }

    runtimeMins = parseInt(runtimeMins, 10);

    const movie = {
        title,
        description,
        runtimeMins,
    };

    const createdMovie = await prisma.movie.create({
        data: {
            ...movie,
        },
    });

    console.log('Created Movie', createdMovie);

    const fetchedMovies = await getAllMovies();

    res.json(await getAllMovies());
};

module.exports = { getMovies, createMovie };

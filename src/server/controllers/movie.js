const { PrismaClient } = require('@prisma/client');

const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const secret = 'secret';

const createMovie = async (req, res) => {
    let { title, description, runtimeMins } = req.body;

    const token = req.headers.authorization;

    if (!token) return res.status(401).json('user not logged in');

    console.log({ title, description, runtimeMins });

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

    const fetchedMovies = await prisma.movie.findMany({});

    const response = { createdMovie, fetchedMovies };

    res.json(response);
};

module.exports = { createMovie };

const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const secret = 'secret';

const createMovie = async () => {
    const {title, description, runtimeMins, token} = req.body

    if (!token) return res.status(401).json('user not logged in')

    
}

module.exports = { createMovie }
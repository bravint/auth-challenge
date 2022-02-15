const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const saltRounds = 10;

const secret = 'secret';

const hashedPassword = async (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);

    return (hash = bcrypt.hashSync(password, salt));
};

const checkPassword = async (textPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(textPassword, hashedPassword);
    } catch (error) {
        console.log(`error in password check`, error);
        return error;
    }
};

const createUser = async (req, res) => {
    let { username, password } = req.body;

    password = await hashedPassword(password);

    const user = {
        username,
        password,
    };

    const createdUser = await prisma.user.create({
        data: {
            ...user,
        },
    });

    res.json(createdUser);
};

const authUser = async (req, res) => {
    let { username, password } = req.body;

    const foundUser = await prisma.user.findUnique({
        where: {
            username,
        },
    });

    if (!foundUser) return res.status(401).json('User does not exist');

    const passwordsMatch = await checkPassword(password, foundUser.password);

    if (!passwordsMatch) return res.status(401).json('User authentication failed');

    const user = {
        username,
        password,
    };

    const token = jwt.sign(user, secret);

    res.json(token);
};

module.exports = { createUser, authUser };
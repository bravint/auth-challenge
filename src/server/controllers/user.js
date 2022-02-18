const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { prisma, secret, saltRounds } = require('../utils');

const hashedPassword = (password) => bcrypt.hashSync(password, saltRounds);

const createToken = (payload) => jwt.sign(payload, secret);

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

    password = hashedPassword(password);

    const user = {
        username,
        password,
    };

    const createdUser = await prisma.user.create({
        data: {
            ...user,
        },
    });

    if (!createdUser) return res.status(500).json('User registation failed');
    
    res.json(createToken(username));
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

    res.json(createToken(username));
};

module.exports = { createUser, authUser };

const { prisma } = require('@prisma/client');

const createUser = async (req, res) => {
    let { username, password } = req.body;

    const user = {
        username,
        password,
    };

    const createdUser = await prisma.user.create({
        data: {
            user,
        },
    });

    res.json(createdUser);
};

const authUser = async (req, res) => {};

module.exports = { createUser, authUser };

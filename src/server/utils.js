const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const saltRounds = 10;

const secret = 'secret';

module.exports = {
    prisma,
    saltRounds,
    secret,
};
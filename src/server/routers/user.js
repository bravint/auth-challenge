const express = require('express');

const {createUser, authUser} = require('../controllers/user')

const router = express.Router();

router.post('/register', createUser)

router.post('/login', authUser)

module.exports = router;

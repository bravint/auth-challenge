require('dotenv').config();

const express = require('express');
const cors = require('cors');

const movieRouter = require('./routers/movie');
const userRouter = require('./routers/user');

const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/movie', movieRouter);

app.get('*', (req, res) => {
    res.json({ ok: true });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});

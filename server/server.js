const knex = require('./config/db-config.js');
const express = require('express');
const cors = require('cors');
const colors = require('colors');
const _ = require('colors');

const personRoutes = require('./routes/personRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const { pageNotFound, errorHandler } = require('./middlewares/error.js');
const ENVIRONMENT = require('./utils/constants/environments.js');

const app = express();

app.use(
  cors({
    origin: [ENVIRONMENT.IS_PRODUCTION ? process.env.PRODUCTION_CLIENT_ORIGIN : process.env.DEVELOPMENT_CLIENT_ORIGIN],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
  })
);

app.use(express.json());

app.use('/api/v1/persons', personRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('/', (_req, res) => {
  res.send('Our Express API is running..');
});

app.use(pageNotFound);
app.use(errorHandler);

const MODE = process.env.NODE_ENV;
const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  console.log(`Server running in ${MODE} mode on port ${PORT}`.bold.blue.bgWhite);
});

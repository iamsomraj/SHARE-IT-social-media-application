const knex = require('./config/db-config.js');
const express = require('express');
const cors = require('cors');
const _ = require('colors');

const personRoutes = require('./routes/personRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const { pageNotFound, errorHandler } = require('./middlewares/error.js');
const ENVIRONMENT = require('./utils/constants/environments.js');

const app = express();

app.use(
  cors({
    origin: [process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_CLIENT_ORIGIN : process.env.DEVELOPMENT_CLIENT_ORIGIN],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
  })
);

app.use(express.json());
app.use('/api/v1/persons', personRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(pageNotFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bgWhite.bold);
});

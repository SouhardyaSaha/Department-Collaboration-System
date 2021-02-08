'use strict';

// Imports
const express = require('express');
const path = require('path')
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors')
// const expressMongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const compression = require('compression');

// Creating the express app
const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true

}))

// Security Middleware
app.use(helmet());

// Compression Middleware
app.use(compression());

// Parsing JSON and Cookies
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use('/files', express.static(path.join(__dirname, 'public/storage/files')))

// Prevent XSS attacks
app.use(xssClean());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Testing a route
app.get('/', (req, res) => {
  res.send('Hello');
});

// Register the routers
app.use(router);

// Using the errorHandler middleware
app.use(errorHandler);

// Exporting the app
module.exports = app;

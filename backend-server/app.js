'use strict';

// Imports
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors')
// const expressMongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const compression = require('compression');

//Added by Rakib
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const adminRouter = require('./routes/admin');
const routineROuter = require('./routes/routine');

// Creating the express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-With,Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET,POST,PUT,PATCH,DELETE,OPTIONS");

  next();
});

// app.use('/admin',adminRouter);
// app.use('/routine',routineROuter);

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
app.use(cookieParser());

// Sanitizing user data
// app.use(expressMongoSanitize());

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

'use strict';

const { getAllSessions, createSession } = require('../controllers/sessionController');

// Importing functions from the controller

// Importing the express router
const sessionRouter = require('express').Router();

// Setting up the routes
sessionRouter.route('/')
    .get(getAllSessions)
    .post(createSession)

module.exports = sessionRouter
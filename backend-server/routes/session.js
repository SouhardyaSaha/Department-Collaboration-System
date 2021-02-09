'use strict';

const { getAllSessions, createSession,deleteSession } = require('../controllers/sessionController');

// Importing functions from the controller

// Importing the express router
const sessionRouter = require('express').Router();

// Setting up the routes
sessionRouter.route('/')
.get(getAllSessions)
.post(createSession)
sessionRouter.route('/:id')
    .delete(deleteSession)

module.exports = sessionRouter
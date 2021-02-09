'use strict';

const { createClasswork } = require('../controllers/classworkController');
const { protect, restrictTo } = require('../middlewares/protect');
const { roles } = require('../utils/roles');
const submissionRouter = require('./submission');

// Importing functions from the controller

// Importing the express router
const classworkRouter = require('express').Router({ mergeParams: true });

// Setting up the routes
classworkRouter.route('/')
    .post(protect, restrictTo([roles.Teacher]), createClasswork)

classworkRouter.use('/:classworkId/submission', submissionRouter)

module.exports = classworkRouter
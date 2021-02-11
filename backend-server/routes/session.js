'use strict';
const { protect, restrictTo } = require('../middlewares/protect');

const { getAllSessions, createSession, deleteSession, uploadSessionRoutine, getStudentSession } = require('../controllers/sessionController');
const { roles } = require('../utils/roles');
const upload = require('../middlewares/fileUploader');

// Importing functions from the controller

// Importing the express router
const sessionRouter = require('express').Router();

// Setting up the routes
sessionRouter.route('/')
    .get(getAllSessions)
    .post(protect, restrictTo([roles.Admin]), createSession)

sessionRouter.route('/student')
    .get(protect, restrictTo([roles.Student]), getStudentSession)

sessionRouter.route('/:id')
    .delete(protect, restrictTo([roles.Admin]), deleteSession)

sessionRouter.route('/:id/upload-routine')
    .patch(protect, restrictTo([roles.Teacher]), upload.single('file'), uploadSessionRoutine)

module.exports = sessionRouter
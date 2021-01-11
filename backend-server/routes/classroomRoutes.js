'use strict';

// Importing functions from the controller
const {
    getClassrooms,
    createClassroom,
    getClassroomById,
    updateClassroom
} = require('../controllers/classroomController');
const { protect, restrictTo } = require('../middlewares/protect');
const { roles } = require('../utils/roles');

// Importing the express router
const classroomRouter = require('express').Router();

// Setting up the routes
classroomRouter.route('/')
    .get(protect, getClassrooms)
    .post(protect, restrictTo([roles.Teacher]), createClassroom)

classroomRouter.route('/:id')
    .get(protect, getClassroomById)
    .patch(protect, restrictTo([roles.Teacher]), updateClassroom)

module.exports = classroomRouter
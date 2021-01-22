'use strict';

// Importing functions from the controller
const {
    addStudentsToClassroom,
    removeStudentsFromClassroom,
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
    .post(protect, restrictTo([roles.Teacher]), createClassroom)

classroomRouter.route('/:id')
    .get(protect, restrictTo([roles.Teacher]), getClassroomById)
    .patch(protect, restrictTo([roles.Teacher]), updateClassroom)

classroomRouter.route('/:id/addStudents')
    .patch(protect, restrictTo([roles.Teacher]), addStudentsToClassroom)

classroomRouter.route('/:id/removeStudents')
    .patch(protect, restrictTo([roles.Teacher]), removeStudentsFromClassroom)

module.exports = classroomRouter
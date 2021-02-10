'use strict';

// Importing functions from the controller
const {
    addStudentsToClassroom,
    removeStudentsFromClassroom,
    createClassroom,
    getClassroomById,
    getClassrooms,
    updateClassroom
} = require('../controllers/classroomController');
const { protect, restrictTo } = require('../middlewares/protect');

const { roles } = require('../utils/roles');
const attendanceRouter = require('./attendance');
const classworkRouter = require('./classwork');
const postRouter = require('./post');

// Importing the express router
const classroomRouter = require('express').Router();

// Setting up the routes
classroomRouter.route('/')
    .post(protect, restrictTo([roles.Teacher]), createClassroom)
    .get(protect, restrictTo([roles.Teacher, roles.Student]), getClassrooms)

// For CLassroom Posts and comments
classroomRouter.use('/:classroomId/posts', postRouter)
// For classroom classworks
classroomRouter.use('/:classroomId/classworks', classworkRouter)
// For classroom attendance
classroomRouter.use('/:classroomId/attendances', attendanceRouter)

classroomRouter.route('/:id')
    .get(protect, restrictTo([roles.Teacher, roles.Student]), getClassroomById)
    .patch(protect, restrictTo([roles.Teacher]), updateClassroom)

classroomRouter.route('/:id/addStudents')
    .patch(protect, restrictTo([roles.Teacher]), addStudentsToClassroom)

classroomRouter.route('/:id/removeStudents')
    .patch(protect, restrictTo([roles.Teacher]), removeStudentsFromClassroom)

module.exports = classroomRouter
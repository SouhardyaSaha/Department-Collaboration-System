'use strict';

const { getAllCourses, createCourse,deleteCourse } = require('../controllers/courseController');
const { protect, restrictTo } = require('../middlewares/protect');
const {roles} =  require('../utils/roles')
// Importing functions from the controller

// Importing the express router
const courseRouter = require('express').Router();

// Setting up the routes
courseRouter.route('/')
.get(getAllCourses)
.post(protect, restrictTo([roles.Admin]), createCourse)
courseRouter.route('/:id')
    .delete(protect, restrictTo([roles.Admin]),deleteCourse)

module.exports = courseRouter
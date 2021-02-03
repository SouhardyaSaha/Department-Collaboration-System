'use strict';

const { getAllCourses, createCourse } = require('../controllers/courseController');

// Importing functions from the controller

// Importing the express router
const courseRouter = require('express').Router();

// Setting up the routes
courseRouter.route('/')
    .get(getAllCourses)
    .post(createCourse)

module.exports = courseRouter
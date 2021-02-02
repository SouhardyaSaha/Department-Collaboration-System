('use strict');

// Importing the app error class
const AppError = require('../utils/appError');

// Importing the routers
const userRouter = require('./userRoutes');
const classroomRouter = require('./classroomRoutes');
const routineROuter = require('./routine');
const attendanceRouter = require('./attendance');
const sessionRouter = require('./session');
const courseRouter = require('./course');

// Importing express router
const router = require('express').Router();

// Registering all routers
router.use('/users', userRouter);
router.use('/classrooms', classroomRouter)
router.use('/sessions', sessionRouter)
router.use('/courses', courseRouter)

router.use('/routine', routineROuter);
router.use('/attendance', attendanceRouter);
// The 404 route
router.all('*', (req, res, next) => next(new AppError('Not found', 404)));

module.exports = router;

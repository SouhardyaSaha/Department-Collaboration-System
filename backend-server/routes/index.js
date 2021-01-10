('use strict');

// Importing the app error class
const AppError = require('../utils/appError');

// Importing the routers
const userRouter = require('./userRoutes');
const classroomRouter = require('./classroomRoutes');
// const teacherRouter = require('./teacherRoutes');
// const testRouter = require('./testRoutes');

// Importing express router
const router = require('express').Router();

// Registering all routers
router.use('/users', userRouter);
router.use('/classrooms', classroomRouter)
// router.use('/teachers', teacherRouter);
// router.use('/classrooms', classr);
// router.use('/test', testRouter);

// The 404 route
router.all('*', (req, res, next) => next(new AppError('Not found', 404)));

module.exports = router;

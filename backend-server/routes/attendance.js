const express = require('express');
const { createAttendances, getStudentAttendance, getLectureWithAttendances } = require('../controllers/attendanceController');
const { protect, restrictTo } = require('../middlewares/protect');
const { roles } = require('../utils/roles');
const { route } = require('./submission');
const attendanceRouter = express.Router({ mergeParams: true });

attendanceRouter.route('/')
    .post(protect, restrictTo([roles.Teacher]), createAttendances)

attendanceRouter.route('/students/:studentId')
    .get(protect, restrictTo([roles.Teacher]), getStudentAttendance)

attendanceRouter.route('/lectures')
    .get(protect, restrictTo([roles.Teacher]), getLectureWithAttendances)

module.exports = attendanceRouter;

const Course = require("../models/course");
const catchAsync = require("../utils/catchAsync");

const createCourse = catchAsync(async (req, res, next) => {
    const course = await Course.create(req.body)
    res.json({
        status: 'success',
        data: {
            course
        }
    })
})

const getAllCourses = catchAsync(async (req, res, next) => {
    const courses = await Course.findAll()
    res.json({
        status: 'success',
        data: {
            courses
        }
    })
})

module.exports = { createCourse, getAllCourses }
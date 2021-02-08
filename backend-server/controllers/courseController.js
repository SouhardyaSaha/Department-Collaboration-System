const Course = require("../models/course");
const catchAsync = require("../utils/catchAsync");
const Admin = require('../models/admin')
const User = require('../models/user')

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
    const courses = await Course.findAll({
        include: [
            {
                model: Admin,
                include: {
                    model: User,
                    attributes: ['id', 'name', 'email']
                }
            }
        ]
    })
    res.json({
        status: 'success',
        data: {
            courses
        }
    })
})

module.exports = { createCourse, getAllCourses }
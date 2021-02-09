const Course = require("../models/course");
const catchAsync = require("../utils/catchAsync");
const Admin = require('../models/admin')
const User = require('../models/user')

const createCourse = catchAsync(async (req, res, next) => {
    const admin = await req.user.getAdmin()
    const course = await Course.create(
        {
            title:req.body.course_title,
            credit:req.body.credit,
            adminId: admin.id,
            is_optional:req.body.optional,
            semester:req.body.session,
            details:req.body.details,
        }
    )
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
const deleteCourse = catchAsync(async (req, res, next) => {
    const course = await Course.destroy({
        where: {
          id:req.params.id
        }
      });
      res.json({
        status: 'successfully deleted',
        data: {
            course
        }
    })
})

module.exports = { createCourse, getAllCourses,deleteCourse }
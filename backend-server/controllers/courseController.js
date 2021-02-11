const Course = require("../models/course");
const catchAsync = require("../utils/catchAsync");
const Admin = require('../models/admin')
const User = require('../models/user')

const createCourse = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const admin = await req.user.getAdmin()
    const course = await Course.create(
        {
            title:req.body.course_title,
        credit:req.body.credit,
        is_optional:req.body.optional,
        semester:req.body.session,
        adminId: admin.id,
        details:req.body.details
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
const updateCourse = catchAsync(async(req,res,next)=>{
    // console.log(req.body,req.params.id)
    const admin = await req.user.getAdmin()
    const getCourse = await Course.findByPk(req.params.id);
    const course = await getCourse.update({
        title:req.body.course_title,
        credit:req.body.credit,
        is_optional:req.body.optional,
        semester:req.body.session,
        adminId: admin.id,
        details:req.body.details
    })
    // console.log('Here',course);
    res.json({
        status:'successfully updated',
        data:{
            course
        }
    })
})

module.exports = { createCourse, getAllCourses,deleteCourse,updateCourse }
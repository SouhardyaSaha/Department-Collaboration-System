const catchAsync = require("../utils/catchAsync");
const Post = require('../models/post');
const Classroom = require("../models/classroom");
const User = require("../models/user");
const { roles } = require('../utils/roles');
const AppError = require("../utils/appError");

const createPost = catchAsync(async (req, res, next) => {
    const id = req.params.classroomId
    let classroom
    if (req.user.role === roles.Teacher) {
        let teacher = await req.user.getTeacher();
        classroom = (await teacher.getClassrooms({ where: { id } }))[0]
    }
    else if (req.user.role === roles.Student) {
        let student = await req.user.getStudent()
        classroom = (await student.getClassrooms({ where: { id } }))[0]
    }
    if (!classroom) return next(new AppError('Invalid Operation', 400));
    // console.log(classroom);
    const { content } = req.body
    // const classroom = await Classroom.findByPk(req.params.id, { attributes: ['id'] })
    const post = await classroom.createPost(
        {
            content,
            userId: req.user.id
        }
    )
    res.json({
        status: 'success',
        data: {
            post
        }
    })
})

const getPosts = catchAsync(async (req, res, next) => {
    const classroom = await Classroom.findByPk(req.params.id, { attributes: ['id'] })
    const posts = await classroom.getPosts({
        include: [
            {
                model: User,
                attributes: ['id', 'name', 'role']
            }
        ]
    })
    res.json({
        status: 'success',
        data: {
            posts
        }
    })
})

module.exports = {
    createPost,
    getPosts
}
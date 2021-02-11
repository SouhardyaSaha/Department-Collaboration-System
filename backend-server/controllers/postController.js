const catchAsync = require("../utils/catchAsync");
const Post = require('../models/post');
const Classroom = require("../models/classroom");
const User = require("../models/user");
const { roles } = require('../utils/roles');
const AppError = require("../utils/appError");
const sequelize = require("../db/config");

const createPost = catchAsync(async (req, res, next) => {

    const post = await sequelize.transaction(async (t) => {
        const id = req.params.classroomId
        let classroom
        if (req.user.role === roles.Teacher) {
            let teacher = await req.user.getTeacher();
            classroom = (await teacher.getClassrooms({ where: { id }, transaction: t }))[0]
        }
        else if (req.user.role === roles.Student) {
            let student = await req.user.getStudent()
            classroom = (await student.getClassrooms({ where: { id }, transaction: t }))[0]
        }
        if (!classroom) return next(new AppError('Invalid Operation', 400));
        // console.log(classroom);
        const { content } = req.body
        // const classroom = await Classroom.findByPk(req.params.id, { attributes: ['id'] })
        const createdPost = await classroom.createPost(
            {
                content,
                userId: req.user.id
            },
            {
                transaction: t
            }
        )

        const files = req.files
        console.log(files);
        const url = req.protocol + '://' + req.get('host')
        // console.log(url);
        let createdFiles = []

        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            let uri = `${url}/files/${file.filename}`;
            let is_image = file.mimetype.includes('image')
            let createdFile = await createdPost.createFile({ uri, is_image }, { transaction: t })
            createdFiles = [...createdFiles, createdFile]
        }

        // createdPost.toJSON()
        return { post: createdPost, files: createdFiles }
    })


    res.json({
        status: 'success',
        data: {
            ...post,

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


const updatePost = catchAsync(async (req, res, next) => {
    const { classroomId, postId } = req.params
    const post = (await Post.findOne({ id: postId, classroomId, userId: req.user.id })).update(req.body)
    res.json({
        status: 'success',
        data: {
            post
        }
    })
})

const deletePost = catchAsync(async (req, res, next) => {
    const { classroomId, postId } = req.params
    const post = (await Post.findOne({ id: postId, classroomId, userId: req.user.id })).destroy()
    res.json({
        status: 'success',
        data: {
            post
        }
    })
})


module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost
}
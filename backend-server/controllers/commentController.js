const catchAsync = require("../utils/catchAsync");
const Post = require('../models/post');
const Classroom = require("../models/classroom");
const User = require("../models/user");
const { roles } = require('../utils/roles');
const AppError = require("../utils/appError");

const createComment = catchAsync(async (req, res, next) => {
    const userId = req.user.id
    const { classroomId, postId } = req.params
    const { content } = req.body

    const post = await Post.findOne({ where: { id: postId, classroomId } })
    if (!post) return next(new AppError('Not Found', 404))
    const comment = await post.createComment(
        {
            content,
            userId
        }
    )

    res.json({
        status: 'success',
        comment
    })
})

const getComments = catchAsync(async (req, res, next) => {
    const { classroomId, postId } = req.params
    const post = await Post.findOne(postId, { where: { classroomId } })

})

module.exports = {
    createComment,
    getComments
}
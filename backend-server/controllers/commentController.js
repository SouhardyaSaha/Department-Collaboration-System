const catchAsync = require("../utils/catchAsync");
const Post = require('../models/post');
const Classroom = require("../models/classroom");
const User = require("../models/user");
const { roles } = require('../utils/roles');
const AppError = require("../utils/appError");
const Comment = require("../models/comment");

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

    const getComment = await Comment.findByPk(comment.id, { include: { model: User, attributes: ['id', 'name', 'email'] } })

    res.json({
        status: 'success',
        data: {
            comment: getComment
        }
    })
})

const getComments = catchAsync(async (req, res, next) => {
    const { classroomId, postId } = req.params
    const post = await Post.findOne(postId, { where: { classroomId } })

})

const deleteComment = catchAsync(async (req, res, next) => {
    const { classroomId, postId, commentId } = req.params
    const comment = await Comment.findOne(
        {
            where: {
                id: commentId,
                postId
            }
        }
    )

    await comment.destroy()

    res.json({
        status: 'success',
        comment
    })

})


module.exports = {
    createComment,
    getComments,
    deleteComment
}
'use strict';

// This router is called from classroom router

const { createPost, getPosts, deletePost, updatePost } = require('../controllers/postController');
const { protect } = require('../middlewares/protect');
const { createComment, getComments, deleteComment } = require('../controllers/commentController');
const upload = require('../middlewares/fileUploader');

// Importing the express router
const postRouter = require('express').Router({ mergeParams: true });

// console.log(req.params);
// Setting up the routes
postRouter.route('/')
    .get(protect, getPosts)
    .post(protect, upload.array('files', 10), createPost)
// upload.array('files', 10),

postRouter.route('/:postId')
    .delete(protect, deletePost)
    .patch(protect, updatePost)

postRouter.route('/:postId/comments')
    .post(protect, createComment)
    .get(protect, getComments)

postRouter.route('/:postId/comments/:commentId')
    .delete(protect, deleteComment)



module.exports = postRouter
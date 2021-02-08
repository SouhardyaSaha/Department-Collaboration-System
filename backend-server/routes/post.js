'use strict';

// This router is called from classroom router

const { createPost, getPosts } = require('../controllers/postController');
const { protect } = require('../middlewares/protect');
const { createComment, getComments } = require('../controllers/commentController');
const upload = require('../middlewares/fileUploader');

// Importing the express router
const postRouter = require('express').Router({ mergeParams: true });

// console.log(req.params);
// Setting up the routes
postRouter.route('/')
    .get(protect, getPosts)
    .post(protect, upload.array('files', 10), createPost)
// upload.array('files', 10),

// postRouter.route('/:postId').delete().patch()

postRouter.route('/:postId/comments')
    .post(protect, createComment)
    .get(protect, getComments)



module.exports = postRouter
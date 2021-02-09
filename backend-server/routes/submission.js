'use strict';
const { submitClasswork } = require('../controllers/classworkController');
const upload = require('../middlewares/fileUploader');
const { restrictTo, protect } = require('../middlewares/protect');
const { roles } = require('../utils/roles');

// this is for classwork submissions
// This router is called from classroom router

// Importing the express router
const submissionRouter = require('express').Router({ mergeParams: true });

submissionRouter.route('/')
    .post(protect, restrictTo([roles.Student]), upload.array('files', 10), submitClasswork)
// .post(protect, upload.array('files', 10), submitClasswork)



module.exports = submissionRouter
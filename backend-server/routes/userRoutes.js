'use strict';

// Importing functions from the controller
const {
  getUsers,
  signUp,
  getUserProfile,
  login,
  logout,
  sendInvitation,
  signUpByInvitation,
  getAllStudents,
  getAllTeachers,
  deleteUser,
  resetPassword,
  requestResetPassword
} = require('../controllers/userController');
const { protect, restrictTo } = require('../middlewares/protect');
const { protectResetPassword } = require('../middlewares/protectResetPassword');
const { protectUserRegistration } = require('../middlewares/protectUserRegistration');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const { roles } = require('../utils/roles');

// Importing the express router
const userRouter = require('express').Router();

// Setting up the routes
userRouter.route('/')
  .get(protect, getUsers)
  .post(signUp);

userRouter.route('/students')
  .get(protect, getAllStudents)

userRouter.route('/teachers')
  .get(protect, getAllTeachers)

userRouter.route('/:id')
  .delete(protect, restrictTo([roles.Admin]), deleteUser)

userRouter.route('/invite')
  .post(sendInvitation)

userRouter.route('/register/:token')
  .post(protectUserRegistration, signUpByInvitation)

userRouter.route('/reset')
  .post(requestResetPassword)

userRouter.route('/reset/:token')
  .post(protectResetPassword, resetPassword)

userRouter.route('/login')
  .post(login);

userRouter.route('/logout')
  .post(logout);

userRouter.route('/me')
  .get(protect, getUserProfile);

module.exports = userRouter;

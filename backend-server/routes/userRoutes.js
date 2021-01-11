'use strict';

// Importing functions from the controller
const {
  getUsers,
  signUp,
  getUserProfile,
  login,
  logout,
} = require('../controllers/userController');
const { protect } = require('../middlewares/protect');

// Importing the express router
const userRouter = require('express').Router();

// Setting up the routes
userRouter.route('/')
  .get(protect, getUsers)
  .post(signUp);

userRouter.route('/login')
  .post(login);

userRouter.route('/logout')
  .post(logout);

userRouter.route('/me')
  .get(protect, getUserProfile);

module.exports = userRouter;

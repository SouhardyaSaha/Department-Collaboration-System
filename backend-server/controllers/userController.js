'use strict';

// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { roles } = require('../utils/roles');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Session = require('../models/session');
const Student = require('../models/student');

// Function to get all users
const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();
  res.status(200).json({
    status: 'success',
    data: { users },
  });
});

// Function to sign up a user
const signUp = catchAsync(async (req, res, next) => {
  const { role, profile } = req.body
  await validateRoleData(role, profile, next)
  const user = await User.create(req.body);
  // console.log(user);
  // Creating role profile
  switch (user.role) {
    case roles.Admin:
      await user.createAdmin(profile)
      break;
    case roles.Student:
      await user.createStudent(profile)
      break;
    case roles.Teacher:
      await user.createTeacher(profile)
      break;

    default:
      break;
  }

  const role_data = await getRoleProfile(user)
  sendToken({ user, role_data }, 201, res);
});

// Function to login a user
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Provide valid email and password!', 400));
  }

  const user = await await User.findOne({ email });
  if (!user) return next(new AppError('Invalid email or password', 401));

  const correct = await bcrypt.compare(password, user.password);
  if (!correct) return next(new AppError('Invalid email or password', 401));

  const role_data = await getRoleProfile(user)
  sendToken({ user, role_data }, 201, res);
});

const logout = catchAsync(async (req, res, next) => {
  res.cookie('jwt', '', { expiresIn: 1000 });
  res.status(200).json({ status: 'success' });
});

// Function to get user by id
const getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.user.id);
  const role_data = await getRoleProfile(user)
  if (!user) return next(new AppError('Not found!', 404));

  res.status(200).json({
    status: 'success',
    data: { user, role_data },
  });
});

// Signing a token
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Send token to client
const sendToken = (data, statusCode, res) => {
  const {user} = data
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV == 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data,
  });
};

// Get User Profile by Role
const getRoleProfile = async (user) => {
  const role = user.role
  if (role === roles.Admin) {
    return await user.getAdmin()
  }
  else if (role === roles.Student) {
    return await user.getStudent({ include: Session })
  }
  else if (role === roles.Teacher) {
    return await user.getTeacher()
  }

}

const validateRoleData = async (role, profile, next) => {
  switch (role) {
    case roles.Student:
      const { registration, sessionId } = profile
      if (!await Session.findByPk(sessionId) || !registration) return next(new AppError('Invalid Session Id or Registration', 400))
      if (await Student.findOne({ where: { registration } })) return next(new AppError('Registration Must be unique', 400))
      break;

    default:
      break;
  }
}

module.exports = { signUp, getUsers, getUserProfile, login, logout };

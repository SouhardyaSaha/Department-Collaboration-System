'use strict';

// Importing the model
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { roles } = require('../utils/roles');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sequelize = require('../db/config');
const Teacher = require('../models/teacher');
const Student = require('../models/student');

// Function to get all users
const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({ include: [Student, Teacher] });
  res.status(200).json({
    status: 'success',
    data: { users },
  });
});

// Function to sign up a user
const signUp = catchAsync(async (req, res, next) => {
  const { role, profile } = req.body

  const createdUser = await sequelize.transaction(async (t) => {
    const user = await User.create(req.body, { transaction: t });
    // Creating role profile
    switch (role) {
      case roles.Admin:
        await user.createAdmin(profile, { transaction: t })
        break;
      case roles.Student:
        await user.createStudent(profile, { transaction: t })
        break;
      case roles.Teacher:
        await user.createTeacher(profile, { transaction: t })
        break;

      default:
        break;
    }

    return user
  })
  // console.log(createdUser);

  // const role_data = await getRoleProfile(user)
  sendToken({ user: createdUser }, 201, res);
});

// Function to login a user
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Provide valid email and password!', 400));
  }

  const user = await User.findOne({ where: { email } });
  if (!user) return next(new AppError('Invalid email or password', 401));

  const correct = await bcrypt.compare(password, user.password);
  if (!correct) return next(new AppError('Invalid email or password', 401));

  sendToken({ user }, 201, res);
});

const logout = catchAsync(async (req, res) => {
  res.cookie('jwt', '', { expiresIn: 1000 });
  res.status(200).json({ status: 'success' });
});

// Function to get user Profile
const getUserProfile = catchAsync(async (req, res, next) => {

  let userProfile

  if (req.user.role === 'teacher') {
    userProfile = await req.user.getTeacher(
      {
        include:
        {
          model: User,
          attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
        },
      }
    )
  }
  else if (req.user.role === 'student') {
    userProfile = await req.user.getStudent(
      {
        include:
        {
          model: User,
          attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
        },
      })
  }

  res.status(200).json({
    status: 'success',
    data: { userProfile },
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
  const { user } = data
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
    data
  });
};

// Get User Profile by Role
// const getRoleProfile = async (user) => {
//   const options = {
//     include:
//     {
//       model: User,
//       attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
//     },
//   }
//   const role = user.role
//   if (role === roles.Admin) {
//     return await user.getAdmin(options)
//   }
//   else if (role === roles.Student) {
//     return await user.getStudent(options, { include: Session })
//   }
//   else if (role === roles.Teacher) {
//     return await user.getTeacher(options)
//   }

// }

module.exports = { signUp, getUsers, getUserProfile, login, logout };

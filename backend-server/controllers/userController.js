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
const Session = require('../models/session');
const sendEmail = require('../mail/sendEmail');

const sendInvitation = catchAsync(async (req, res, next) => {
  const { role, sessionId } = req.body
  req.body.emails.forEach(email => {

    let token = jwt.sign(
      { email, role, sessionId },
      process.env.JWT_USER_REGISTRATION_SECRET,
      {
        expiresIn: process.env.JWT_USER_REGISTRATION_EXPIRES_IN,
      }
    );

    let url = `http://localhost:4200/auth/register/${token}/${role}`
    let html = `
    <h1>You are invited to join the system</h1>
      <a href="${url}">Click Here</a>
      <br>
      `
    // ${token}
    sendEmail(email, 'Invitation to Join', html)
  });

  res.json({
    status: 'success'
  })
})

const signUpByInvitation = catchAsync(async (req, res, next) => {
  let { profile } = req.body
  const { name, password } = req.body
  const { email, role, sessionId } = req.reg_data

  const existingEmail = (await User.count({ where: { email } })) === 1
  if (existingEmail) {
    return next(new AppError('Email Already in use', 409))
  }

  profile = {
    ...profile,
    sessionId,
  }
  const createdUser = await sequelize.transaction(async (t) => {
    const user = await User.create({ name, password, email, role }, { transaction: t });
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

const requestResetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body
  const user = await User.findOne({ where: { email } })

  if (!user) {
    res.json({
      status: 'success'
    })
  }

  let token = jwt.sign(
    { email },
    process.env.JWT_USER_PASSWORD_RESET_SECRET,
    {
      expiresIn: process.env.JWT_USER_PASSWORD_RESET_EXPIRES_IN,
    }
  );

  let url = `http://localhost:4200/auth/reset/${token}`
  let html = `
    <h1>Password Reset Request</h1>
      <a href="${url}">Click Here</a>
      <br>
      `
  // ${token}
  sendEmail(email, 'Password Reset', html)

  res.json({
    status: 'success',
  })

})


const resetPassword = catchAsync(async (req, res, next) => {
  const { password } = req.body
  const email = req.email
  const user = await User.findOne({ where: { email } })

  if (!user) {
    return next(new AppError('No User in Such Mail!'))
  }

  await user.update({
    password
  })

  res.json({
    status: 'success',
  })

})

// Function to get all users
const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({ include: [Student, Teacher] });
  res.status(200).json({
    status: 'success',
    data: { users },
  });
});

const getAllStudents = catchAsync(async (req, res, next) => {
  const students = await Student.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
      {
        model: Session,
      }
    ]
  });
  res.status(200).json({
    status: 'success',
    data: { students },
  });
});

const getAllTeachers = catchAsync(async (req, res, next) => {
  const teachers = await Teacher.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'name', 'email'],
      }
    ]
  });
  res.status(200).json({
    status: 'success',
    data: { teachers },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.status(200).json({
    status: 'success',
    // data: { teachers },
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

module.exports = {
  signUp,
  getUsers,
  getUserProfile,
  login,
  logout,
  sendInvitation,
  signUpByInvitation,
  getAllStudents,
  getAllTeachers,
  deleteUser,
  requestResetPassword,
  resetPassword,
};

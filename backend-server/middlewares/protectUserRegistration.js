'use strict';

const AppError = require('../utils/appError');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const { roles } = require('../utils/roles');

const protectUserRegistration = catchAsync(async (req, res, next) => {
  let token = req.params.token;
  if (!token) return next(new AppError('Unauthorized Operation', 401));

  // Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_USER_REGISTRATION_SECRET);
  // console.log(decoded);
  req.reg_data = decoded
  next();
});


module.exports = { protectUserRegistration };

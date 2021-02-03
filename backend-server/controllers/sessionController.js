const sequelize = require("../db/config");
const Session = require("../models/session");
const catchAsync = require("../utils/catchAsync");

const createSession = catchAsync(async (req, res, next) => {
    const session = await Session.create(req.body)
    res.json({
        status: 'success',
        data: {
            session
        }
    })
})

const getAllSessions = catchAsync(async (req, res, next) => {
    const sessions = await Session.findAll()
    res.json({
        status: 'success',
        data: {
            sessions
        }
    })
})

module.exports = { createSession, getAllSessions }
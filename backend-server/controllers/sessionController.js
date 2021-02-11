const sequelize = require("../db/config");
const File = require("../models/file");
const Session = require("../models/session");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createSession = catchAsync(async (req, res, next) => {
    // console.log('DB',req.body);
    const session = await Session.create({ session: req.body.session })
    res.json({
        status: 'success',
        data: {
            session
        }
    })
})

const uploadSessionRoutine = catchAsync(async (req, res, next) => {
    let session = await Session.findByPk(req.params.id)
    console.log(session);
    const file = req.file
    const url = req.protocol + '://' + req.get('host')
    let uri = `${url}/files/${file.filename}`;
    let is_image = file.mimetype.includes('image')
    if (!is_image) return next(new AppError('Not an Image!', 400));
    session = await session.update({
        routine_uri: uri
    })
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

const getStudentSession = catchAsync(async (req, res, next) => {
    const student = await req.user.getStudent()
    const session = await Session.findOne({ where: { id: student.sessionId } })
    res.json({
        status: 'success',
        data: {
            session
        }
    })
})

const deleteSession = catchAsync(async (req, res, next) => {
    console.log('Session Controller ', req.params.id);
    const id = req.params.id;
    const session = await Session.destroy(
        {
            where: {
                id: id
            }
        }
    )
    res.json({
        status: 'success'
    })
})

module.exports = { createSession, getAllSessions, deleteSession, uploadSessionRoutine, getStudentSession }
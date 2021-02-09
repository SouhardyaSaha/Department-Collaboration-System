const sequelize = require("../db/config");
const Session = require("../models/session");
const catchAsync = require("../utils/catchAsync");

const createSession = catchAsync(async (req, res, next) => {
    // console.log('DB',req.body);
    const session = await Session.create({session:req.body.session})
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

const deleteSession = catchAsync(async(req,res,next)=>{
    console.log('Session Controller ',req.params.id);
    const id = req.params.id;
    const session = await Session.destroy(
        {
            where:{
                id:id
            }
        }
    )
    res.json({
        status:'success'
    })
})

module.exports = { createSession, getAllSessions,deleteSession }
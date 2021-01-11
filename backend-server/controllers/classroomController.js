const Classroom = require("../models/classroom");
const Course = require("../models/course");
const Teacher = require("../models/teacher");
const User = require("../models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createClassroom = catchAsync(async (req, res, next) => {

    const teacher = await req.user.getTeacher({ include: User })
    const classroom = await teacher.createClassroom(req.body)

    res.status(200).json({
        status: 'success',
        data: { classroom, teacher },
    })
})

const getClassrooms = catchAsync(async (req, res, next) => {
    const teacher = await req.user.getTeacher()
    const classrooms = await teacher.getClassrooms({ include: Course })
    // console.log(classrooms);
    res.status(200).json({
        status: 'success',
        data: { classrooms },
    })
})

const getClassroomById = catchAsync(async (req, res, next) => {
    const classroom = await Classroom.findOne(
        {
            where: {
                id: req.params.id,
            },
            include: [Course, Teacher]
        }
    )

    if (!classroom) return next(new AppError('Not Found', 404));

    res.status(200).json({
        status: 'success',
        data: { classroom },
    })
})

const updateClassroom = catchAsync(async (req, res, next) => {
    const teacher = await req.user.getTeacher()
    const classroom = await Classroom.findOne(
        {
            where: {
                id: req.params.id,
                teacherId: teacher.id
            },
        }
    )

    if (!classroom) return next(new AppError('Not Found', 404));

    const updatedClassroom = await classroom.update(req.body)
    const course = await updatedClassroom.getCourse()

    res.status(200).json({
        status: 'success',
        data: { updatedClassroom, course },
    })
})

module.exports = {
    createClassroom,
    getClassrooms,
    getClassroomById,
    updateClassroom
}
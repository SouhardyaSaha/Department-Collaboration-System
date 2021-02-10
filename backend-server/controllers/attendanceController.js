const catchAsync = require("../utils/catchAsync");
const { roles } = require('../utils/roles');
const AppError = require("../utils/appError");
const sequelize = require("../db/config");
const Student = require("../models/student");
const Lecture = require("../models/lecture");
const Attendance = require("../models/attendance");
const User = require("../models/user");

const createAttendances = catchAsync(async (req, res, next) => {
    const { classroomId } = req.params
    // console.log(req.params);
    const { absent_student_ids } = req.body
    console.log(req.body);

    const createdAttendances = await sequelize.transaction(async (t) => {
        const teacher = await req.user.getTeacher();
        const classroom = (await teacher.getClassrooms(
            {
                where: { id: parseInt(classroomId) },
                include: {
                    model: Student,
                    where: {
                        id: absent_student_ids
                    },
                    through: {
                        attributes: []
                    }
                },
                transaction: t
            }
        )
        )[0]
        if (!classroom) return next(new AppError('Invalid Operation', 400))
        const { students } = classroom

        const attendances = []
        const lecture = await classroom.createLecture({}, { transaction: t })
        for (let index = 0; index < students.length; index++) {
            const student = students[index];
            const attendance = await student.createAttendance(
                {
                    classroomId: classroom.id,
                    lectureId: lecture.id
                },
                {
                    transaction: t
                }
            )
            attendances.push(attendance)
        }

        return attendances
    })

    res.json({
        status: 'success',
        data: {
            attendances: createdAttendances
        }
    })
})

const getLectureWithAttendances = catchAsync(async (req, res, next) => {
    const { classroomId } = req.params
    console.log(req.params);
    const teacher = await req.user.getTeacher()

    const classroom = (await teacher.getClassrooms(
        {
            where: { id: classroomId },
            include: {
                model: Lecture,
                include: {
                    model: Attendance,
                    include: {
                        model: Student,
                        include: {
                            model: User,
                            attributes: ['id', 'name', 'email']
                        }
                    }
                }
            }
        }
    ))[0]
    if (!classroom) return next(new AppError('Invalid Operation', 400))

    res.json({
        status: 'success',
        data: {
            lectures: classroom.lectures,
        }
    })
})

const getStudentAttendance = catchAsync(async (req, res, next) => {
    const { classroomId, studentId } = req.params

    const teacher = await req.user.getTeacher()

    let classroom = (await teacher.getClassrooms({ where: { id: classroomId } }))[0]
    if (!classroom) return next(new AppError('Invalid Operation', 400))

    const total_lectures = await Lecture.count({ where: { classroomId } })
    const absent_count = await Attendance.count({ where: { classroomId, studentId } })

    res.json({
        status: 'success',
        data: {
            total_lectures,
            absent_count
        }
    })
})

module.exports = {
    createAttendances,
    getStudentAttendance,
    getLectureWithAttendances
}
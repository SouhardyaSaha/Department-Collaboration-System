'use strict';

const sequelize = require("../db/config");
const Classroom = require("../models/classroom");
const Course = require("../models/course");
const Post = require("../models/post");
const Session = require("../models/session");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const User = require("../models/user");
const Comment = require("../models/comment");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Classwork = require("../models/classwork");
const File = require("../models/file");

const createClassroom = catchAsync(async (req, res, next) => {

    const { sessionId, extra_students_id } = req.body

    const createdClassroom = await sequelize.transaction(async (t) => {
        const teacher = await req.user.getTeacher(
            {
                attributes: ['id'],
                transaction: t
            }
        )

        const classroom = await teacher.createClassroom(req.body, { transaction: t })

        const session = await Session.findByPk(
            sessionId,
            {
                attributes: ['id'],
                include:
                {
                    model: Student,
                    attributes: ['id'],
                },
                transaction: t
            }
        )

        const { students } = session;
        let studentsToAdd
        if (extra_students_id) studentsToAdd = [...students, ...extra_students_id]
        else studentsToAdd = [...students]

        await classroom.addStudents(studentsToAdd, { transaction: t })

        return classroom
    })

    res.status(200).json({
        status: 'success',
        data: { classroom: createdClassroom },
    })

})

const getClassrooms = catchAsync(async (req, res, next) => {
    let dbData
    let queryOptions = {
        include: {
            model: Classroom,
            attributes: ['id'],
            include: [
                {
                    model: Course,
                    // attributes: ['title', 'id']
                },
                {
                    model: Teacher,
                    attributes: ['id', 'designation'],
                    include: {
                        model: User,
                        attributes: ['id', 'name', 'email']
                    }
                }
            ]
        }
    }

    if (req.user.role === 'teacher') {
        dbData = await req.user.getTeacher(queryOptions)
    }
    else {
        dbData = await req.user.getStudent(queryOptions)
    }

    // console.log(classrooms);
    res.json({
        status: 'success',
        data: {
            classrooms: dbData.classrooms
        }
    })
})

const getClassroomById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const teacher = await req.user.getTeacher({ attributes: ['id'] })
    const classroom = await Classroom.findOne(
        {
            where: {
                id,
                teacherId: teacher.id
            },
            include: [
                {
                    model: Course
                },
                {
                    model: Teacher,
                    attributes: ['id', 'designation'],
                    include: {
                        model: User,
                        attributes: ['id', 'name', 'email']
                    }
                },
                {
                    model: Student,
                    attributes: ['id', 'registration'],
                    include: {
                        model: User,
                        attributes: ['id', 'name', 'email']
                    },
                    // Excluding junction table attributes
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Post,
                    separate: true,
                    order: [
                        ['createdAt', 'desc']
                    ],
                    include: [
                        {
                            model: File
                        },
                        {
                            model: User,
                            attributes: ['id', 'name', 'email']
                        },
                        {
                            model: Comment,
                            include: [
                                {
                                    model: User,
                                    attributes: ['id', 'name']
                                }
                            ]
                        }
                    ]
                },
                {
                    model: Classwork,
                    separate: true,
                    order: [
                        ['createdAt', 'desc']
                    ],
                }
            ]
        }
    )

    if (!classroom) return next(new AppError('Not Found', 404));

    res.status(200).json({
        status: 'success',
        data: { classroom },
    })
})

const updateClassroom = catchAsync(async (req, res, next) => {
    const teacher = await req.user.getTeacher({ attributes: ['id'] })
    const classroom = await Classroom.findOne(
        {
            where: {
                id: req.params.id,
                teacherId: teacher.id
            },
        }
    )
    if (!classroom) return next(new AppError('Not Found', 404))

    const updatedClassroom = await classroom.update(req.body)

    res.status(200).json({
        status: 'success',
        data: { classroom: updatedClassroom },
    })
})

const addStudentsToClassroom = async (req, res, next) => {
    const { id } = req.params
    const teacher = await req.user.getTeacher({
        attributes: ['id'],
    })

    const classroom = await Classroom.findOne({
        attributes: ['id'],
        where: {
            id,
            teacherId: teacher.id
        }
    })

    if (!classroom) return next(new AppError('Not Found', 404))

    const { students } = req.body
    const addedStudents = await classroom.addStudents(students)

    res.status(200).json({
        status: 'success',
        addedStudents
    })
}

const removeStudentsFromClassroom = async (req, res, next) => {
    const { id } = req.params
    const teacher = await req.user.getTeacher({
        attributes: ['id'],
    })

    const classroom = await Classroom.findOne({
        attributes: ['id'],
        where: {
            id,
            teacherId: teacher.id
        }
    })
    if (!classroom) return next(new AppError('Not Found', 404))

    const { students } = req.body
    const removedStudents = await classroom.removeStudents(students)

    res.status(200).json({
        status: 'success',
        removedStudents
    })
}

module.exports = {
    createClassroom,
    getClassroomById,
    updateClassroom,
    addStudentsToClassroom,
    removeStudentsFromClassroom,
    getClassrooms
}
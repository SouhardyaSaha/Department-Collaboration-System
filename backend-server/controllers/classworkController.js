const catchAsync = require("../utils/catchAsync");
const { roles } = require('../utils/roles');
const AppError = require("../utils/appError");
const sequelize = require("../db/config");

const createClasswork = catchAsync(async (req, res, next) => {
    const id = req.params.classroomId
    let classroom
    if (req.user.role === roles.Teacher) {
        let teacher = await req.user.getTeacher();
        classroom = (await teacher.getClassrooms({ where: { id } }))[0]
    }
    if (!classroom) return next(new AppError('Invalid Operation', 400));

    const classwork = await classroom.createClasswork(req.body)
    res.json({
        status: 'success',
        data: {
            classwork
        }
    })
})

const submitClasswork = catchAsync(async (req, res, next) => {
    const classroomId = req.params.classroomId
    const classworkId = req.params.classworkId
    const student = await req.user.getStudent()

    // If student is in the classroom
    const classroom = (await student.getClassrooms({ where: { id: classroomId } }))[0]
    if (!classroom) return next(new AppError('Invalid Operation', 400));

    // If classroom contains the classwork
    const classwork = (await classroom.getClassworks({ where: { id: classworkId } }))[0]
    if (!classwork) return next(new AppError('Invalid Operation', 400));

    const submittedSubmission = await sequelize.transaction(async (t) => {
        const submission = await student.createSubmission({ classworkId }, { transaction: t })

        const files = req.files
        // console.log(files);
        const url = req.protocol + '://' + req.get('host')
        // console.log(url);
        let createdFiles = []
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            let uri = `${url}/files/${file.filename}`;
            let is_image = file.mimetype.includes('image')
            let createdFile = await submission.createFile({ uri, is_image }, { transaction: t })
            createdFiles = [...createdFiles, createdFile]
        }

        return { submission, createdFiles }
    })

    res.json({
        status: 'success',
        data: {
            submission: submittedSubmission.submission,
            files: submittedSubmission.createdFiles
        }
    })

})

module.exports = {
    createClasswork,
    submitClasswork
}
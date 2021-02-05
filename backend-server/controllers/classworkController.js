const catchAsync = require("../utils/catchAsync");
const { roles } = require('../utils/roles');
const AppError = require("../utils/appError");

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

module.exports = {
    createClasswork
}
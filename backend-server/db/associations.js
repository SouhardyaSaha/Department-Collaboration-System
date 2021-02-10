const Admin = require("../models/admin")
const Classroom = require("../models/classroom")
const Course = require("../models/course")
const Session = require("../models/session")
const Student = require("../models/student")
const User = require("../models/user")
const Teacher = require("../models/teacher")
const Post = require("../models/post")
const Classwork = require("../models/classwork")
const Comment = require("../models/comment")
const File = require("../models/file")
const Submission = require("../models/submission")
const Lecture = require("../models/lecture")
const Attendance = require("../models/attendance")

// User Relations
User.hasOne(Teacher, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Teacher.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

User.hasOne(Student, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Student.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

User.hasOne(Admin, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Admin.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

// Relation between course and classroom
Course.hasMany(Classroom, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Classroom.belongsTo(Course, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

// Relation between student and classroom
Teacher.hasMany(Classroom, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Classroom.belongsTo(Teacher, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

// Relation between student and classroom
Student.belongsToMany(Classroom, { through: 'classroom_student', onDelete: 'CASCADE' })
Classroom.belongsToMany(Student, { through: 'classroom_student', onDelete: 'CASCADE' })

// Relation between classroom  and classwork
Classroom.hasMany(Classwork, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Classwork.belongsTo(Classroom, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

// Relation between classroom  and classroom posts
Classroom.hasMany(Post, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Post.belongsTo(Classroom, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

User.hasMany(Post, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Post.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

// Relation between post and file
Post.hasMany(File, { onDelete: 'CASCADE' })
File.belongsTo(Post, { onDelete: 'CASCADE' })

// Classwork.hasMany(File)
// File.belongsTo(Classwork)

// Classwork and submission
Classwork.hasMany(Submission, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Submission.belongsTo(Classwork, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

Student.hasMany(Submission, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Submission.belongsTo(Student, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

Submission.hasMany(File, { onDelete: 'CASCADE' })
File.belongsTo(Submission, { onDelete: 'CASCADE' })

// Relation between classroom posts and comments
Post.hasMany(Comment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Comment.belongsTo(Post, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

User.hasMany(Comment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Comment.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

// Relation between student and session
Session.hasMany(Student, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Student.belongsTo(Session, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

Classroom.hasMany(Lecture, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Lecture.belongsTo(Classroom, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

Lecture.hasMany(Attendance, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Attendance.belongsTo(Lecture, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

Classroom.hasMany(Attendance, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Attendance.belongsTo(Classroom, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

Student.hasMany(Attendance, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Attendance.belongsTo(Student, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })


// Relation between Course & Admin
Admin.hasMany(Course, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
Course.belongsTo(Admin, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })

const Admin = require("../models/admin")
const Classroom = require("../models/classroom")
const Course = require("../models/course")
const Session = require("../models/session")
const Student = require("../models/student")
const User = require("../models/user")
const Teacher = require("../models/teacher")
const Attendance = require("../models/attendance")
const Post = require("../models/post")
const Classwork = require("../models/classwork")
const Comment = require("../models/comment")
const File = require("../models/file")
const Submission = require("../models/submission")

// User Relations
User.hasOne(Teacher, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Teacher.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

User.hasOne(Student, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Student.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

User.hasOne(Admin, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Admin.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

// Relation between course and classroom
Course.hasMany(Classroom, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Classroom.belongsTo(Course, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

// Relation between student and classroom
Teacher.hasMany(Classroom, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Classroom.belongsTo(Teacher, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

// Relation between student and classroom
Student.belongsToMany(Classroom, { through: 'classroom_student', onDelete: 'cascade' })
Classroom.belongsToMany(Student, { through: 'classroom_student', onDelete: 'cascade' })

// Relation between classroom  and classwork
Classroom.hasMany(Classwork, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Classwork.belongsTo(Classroom, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

// Relation between classroom  and classroom posts
Classroom.hasMany(Post, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Post.belongsTo(Classroom, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

User.hasMany(Post, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Post.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

// Relation between post and file
Post.hasMany(File, { onDelete: 'cascade' })
File.belongsTo(Post, { onDelete: 'cascade' })

// Classwork.hasMany(File)
// File.belongsTo(Classwork)

// Classwork and submission
Classwork.hasMany(Submission, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Submission.belongsTo(Classwork, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

Student.hasMany(Submission, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Submission.belongsTo(Student, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

Submission.hasMany(File, { onDelete: 'cascade' })
File.belongsTo(Submission, { onDelete: 'cascade' })

// Relation between classroom posts and comments
Post.hasMany(Comment, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Comment.belongsTo(Post, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

User.hasMany(Comment, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Comment.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

// Relation between student and session
Session.hasMany(Student, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Student.belongsTo(Session, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

// Relation between Attendance & Student
Student.hasMany(Attendance, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Attendance.belongsTo(Student, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

// Relation between Attendance & Class
Classroom.hasMany(Attendance, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Attendance.belongsTo(Classroom, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
// Class.hasMany(Attendance, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
// Attendance.belongsTo(Class,{foreignKey: { allowNull: false }, onDelete: 'cascade' })
// Attendance.hasMany(Student, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
// Student.belongsTo(Attendance, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

// Relation between Attendance & Class
// Attendance.hasMany(Class, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
// Class.belongsTo(Attendance, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

// Relation between Course & Admin
Admin.hasMany(Course, { foreignKey: { allowNull: false }, onDelete: 'cascade' })
Course.belongsTo(Admin, { foreignKey: { allowNull: false }, onDelete: 'cascade' })

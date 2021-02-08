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

// User Relations
User.hasOne(Teacher, { foreignKey: { allowNull: false } })
Teacher.belongsTo(User, { foreignKey: { allowNull: false } })

User.hasOne(Student, { foreignKey: { allowNull: false } })
Student.belongsTo(User, { foreignKey: { allowNull: false } })

User.hasOne(Admin, { foreignKey: { allowNull: false } })
Admin.belongsTo(User, { foreignKey: { allowNull: false } })

// Relation between course and classroom
Course.hasMany(Classroom, { foreignKey: { allowNull: false } })
Classroom.belongsTo(Course, { foreignKey: { allowNull: false } })

// Relation between student and classroom
Teacher.hasMany(Classroom, { foreignKey: { allowNull: false } })
Classroom.belongsTo(Teacher, { foreignKey: { allowNull: false } })

// Relation between student and classroom
Student.belongsToMany(Classroom, { through: 'classroom_student' })
Classroom.belongsToMany(Student, { through: 'classroom_student' })

// Relation between classroom  and classwork
Classroom.hasMany(Classwork, { foreignKey: { allowNull: false } })
Classwork.belongsTo(Classroom, { foreignKey: { allowNull: false } })

// Relation between classroom  and classroom posts
Classroom.hasMany(Post, { foreignKey: { allowNull: false } })
Post.belongsTo(Classroom, { foreignKey: { allowNull: false } })

User.hasMany(Post, { foreignKey: { allowNull: false } })
Post.belongsTo(User, { foreignKey: { allowNull: false } })

// Relation between post and file
Post.hasMany(File)
File.belongsTo(Post)

// Relation between classroom posts and comments
Post.hasMany(Comment, { foreignKey: { allowNull: false } })
Comment.belongsTo(Post, { foreignKey: { allowNull: false } })

User.hasMany(Comment, { foreignKey: { allowNull: false } })
Comment.belongsTo(User, { foreignKey: { allowNull: false } })

// Relation between student and session
Session.hasMany(Student, { foreignKey: { allowNull: false } })
Student.belongsTo(Session, { foreignKey: { allowNull: false } })

// Relation between Attendance & Student
Student.hasMany(Attendance, { foreignKey: { allowNull: false } })
Attendance.belongsTo(Student, { foreignKey: { allowNull: false } })

// Relation between Attendance & Class
Classroom.hasMany(Attendance, { foreignKey: { allowNull: false } })
Attendance.belongsTo(Classroom, { foreignKey: { allowNull: false } })
// Class.hasMany(Attendance, { foreignKey: { allowNull: false } })
// Attendance.belongsTo(Class,{foreignKey: { allowNull: false } })
// Attendance.hasMany(Student, { foreignKey: { allowNull: false } })
// Student.belongsTo(Attendance, { foreignKey: { allowNull: false } })

// Relation between Attendance & Class
// Attendance.hasMany(Class, { foreignKey: { allowNull: false } })
// Class.belongsTo(Attendance, { foreignKey: { allowNull: false } })

// Relation between Course & Admin
Admin.hasMany(Course,{foreignKey: {allowNull:false}})
Course.belongsTo(Admin,{foreignKey:{allowNull:false}})

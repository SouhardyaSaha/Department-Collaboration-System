const Admin = require("../models/admin")
const Classroom = require("../models/classroom")
const Course = require("../models/course")
const Session = require("../models/session")
const Student = require("../models/student")
const User = require("../models/user")
const Teacher = require("../models/teacher")
const Attendance = require("../models/attendance")

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

// Relation between student and session
Session.hasMany(Student, { foreignKey: { allowNull: false } })
Student.belongsTo(Session, { foreignKey: { allowNull: false } })

// Relation between Attendance & Student
// Student.hasMany(Attendance, { foreignKey: { allowNull: false } })
// Attendance.belongsTo(Student,{foreignKey: { allowNull: false } })

// Relation between Attendance & Class
// Class.hasMany(Attendance, { foreignKey: { allowNull: false } })
// Attendance.belongsTo(Class,{foreignKey: { allowNull: false } })
Attendance.hasMany(Student, { foreignKey: { allowNull: false } })
Student.belongsTo(Attendance, { foreignKey: { allowNull: false } })

// Relation between Attendance & Class
// Attendance.hasMany(Class, { foreignKey: { allowNull: false } })
// Class.belongsTo(Attendance, { foreignKey: { allowNull: false } })

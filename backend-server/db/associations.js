const Admin = require("../models/admin")
const Class = require("../models/class")
const Classroom = require("../models/classroom")
const Course = require("../models/course")
const Session = require("../models/session")
const Student = require("../models/student")
const User = require("../models/user")
const Teacher = require("../models/teacher")

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
Student.belongsToMany(Classroom, { through: 'student_classroom' })
Classroom.belongsToMany(Student, { through: 'student_classroom' })

// Relation between student and session
Session.hasMany(Student, { foreignKey: { allowNull: false } })
Student.belongsTo(Session, { foreignKey: { allowNull: false } })

// Relation between Classroom and Class
Classroom.hasMany(Class, { foreignKey: { allowNull: false } })
Class.belongsTo(Classroom, { foreignKey: { allowNull: false } })
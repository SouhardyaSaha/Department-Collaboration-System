const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = require('../db/config')

const Student = sequelize.define('student', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    registration: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Student;

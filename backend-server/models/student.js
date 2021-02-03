const { DataTypes } = require('sequelize');

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
        unique: true,
        validate: {
            notEmpty: true,
            isNumeric: true
        }
    }
}, {
    timestamps: false
});

module.exports = Student;

const { DataTypes } = require('sequelize');

const sequelize = require('../db/config')

const Teacher = sequelize.define('teacher', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Teacher;

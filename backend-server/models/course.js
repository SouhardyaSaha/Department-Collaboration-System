const { DataTypes } = require("sequelize");
const sequelize = require('../db/config')

const Course = sequelize.define('course', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    credit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_optional: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    semester: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Course

const Sequelize = require('sequelize');

const sequelize = require('../db/config');

const classRoutine = sequelize.define('classRoutine', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    courseTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    instructorName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    booldays: {
        type: Sequelize.STRING,
        allowNull: false
    },
    startTime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endTime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    roomNum: {
        type: Sequelize.STRING,
        allowNull: false
    },
});


module.exports = classRoutine;

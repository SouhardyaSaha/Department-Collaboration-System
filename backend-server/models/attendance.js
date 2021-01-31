const Sequelize = require('sequelize');

const sequelize = require('../db/config');

const Attendance = sequelize.define('attendance', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    underscored: true
});


module.exports = Attendance;

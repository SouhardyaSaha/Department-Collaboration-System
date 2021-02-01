const { DataTypes } = require("sequelize");
const sequelize = require('../db/config');

const Classroom = sequelize.define('classroom', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
}, {
    underscored: true
});

module.exports = Classroom

const { DataTypes } = require("sequelize");
const sequelize = require('../db/config');

const Class = sequelize.define('class', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
});

module.exports = Class

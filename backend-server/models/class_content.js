const { DataTypes } = require("sequelize");
const sequelize = require('../db/config');

const ClassContent = sequelize.define('classContent', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

module.exports = ClassContent

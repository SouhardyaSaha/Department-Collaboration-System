const { DataTypes } = require("sequelize");
const sequelize = require('../db/config')

const Comment = sequelize.define('comment', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
});

module.exports = Comment

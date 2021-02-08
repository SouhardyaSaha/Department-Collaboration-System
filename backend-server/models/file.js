const { DataTypes } = require("sequelize");
const sequelize = require('../db/config')

const File = sequelize.define('file', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    uri: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    is_image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: false
    }
});

module.exports = File

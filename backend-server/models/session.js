const { DataTypes } = require('sequelize');

const sequelize = require('../db/config')

const Session = sequelize.define('session', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    session: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    routine_uri: {
        type: DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = Session;

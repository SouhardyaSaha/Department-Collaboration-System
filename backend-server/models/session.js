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
    },
});

module.exports = Session;

const { DataTypes } = require('sequelize');

const sequelize = require('../db/config')

const Admin = sequelize.define('admin', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
});

module.exports = Admin;

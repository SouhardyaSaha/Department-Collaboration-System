const { DataTypes } = require("sequelize");
const sequelize = require('../db/config')

const Submission = sequelize.define('submission', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
});

module.exports = Submission

const Sequelize = require('sequelize');

const sequelize = require('../db/config');

const Lecture = sequelize.define('lecture', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
//StudentId & ClassId will be updated in future(Foreign Key)

module.exports = Lecture;

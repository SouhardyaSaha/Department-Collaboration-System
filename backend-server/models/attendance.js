const Sequelize = require('sequelize');

const sequelize = require('../db/config');

const Attendance = sequelize.define('attendance',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement :true,
    allowNull:false,
    primaryKey:true,
  },
  date:{
    type: Sequelize.DATE,
    allowNull:false
  },
  studentId:{
    type: Sequelize.BIGINT,
    allowNull:false
  },
  classId:{
    type: Sequelize.BIGINT,
    allowNull:false
  }
});
//StudentId & ClassId will be updated in future(Foreign Key)

module.exports = Attendance;

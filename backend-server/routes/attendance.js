const express = require('express');

const router = express.Router();

// const db = require('../db/config');
const Attendance = require('../models/attendance');

router.get('/',(req,res,next)=>{
    Attendance.findAll()
    .then((response)=>{
        res.status(200).json({
            message: "Fetching all attendance",
            body: response
        })
    })
    .catch((err)=>{
        console.log(err)
    })

})

router.post('/',(req,res,next)=>{
    const attendanceData = req.body;
    console.log('Here in attendance route:',attendanceData);
    let {student_id,class_id,date} = attendanceData;
    Attendance.create({
      studentId : student_id,
      classId : class_id,
      date
    }).then((response)=>{
      res.status(201).json({
          message:"Attendance    has been added",
          id:response.id
        })
    }).catch(err => console.log(err));
  
  });

  module.exports = router;
  
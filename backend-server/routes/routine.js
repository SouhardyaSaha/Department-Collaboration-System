const express = require('express');

const router = express.Router();

const db = require('../db/config');
const classRoutine = require('../models/routine');


router.get('/',(req,res,next)=>{
  console.log('Routine Model');
  // classRoutine.findAll()
  // .then((routine)=>{
  //   console.log(routine);
  //   res.sendStatus(200);
  // })
  // .catch(err => console.log(err));

  //Fetching data from server
//   const routine=[{
//     id:1,
//     user_id:1,
//     courseTitle:'SWE231',
//     instructorName:'Kamal',
//     booldays:'TFTTF',
//     startTime:'12:00 pm',
//     endTime:'1:00 pm',
//     roomNum:'221'
//   }

// ]
  classRoutine.findAll()
    .then((routine)=>{
      res.status(200).json({
        message:'This is from routine module',
        routines:routine
      });
    })
    .catch(err => console.log(err));

})

router.get('/:id',(req,res,next)=>{
  console.log('Routine Model');
  classRoutine.findByPk(req.params.id)
    .then((routine)=>{
      res.status(200).json({
        message:'This is from routine module with single data',
        routines:routine
      });
    })
    .catch(err => console.log(err));

})


router.put('/:id',(req,res,next)=>{
  // console.log('Routine Model');
  const routineData = req.body;
  // console.log('Router Module',routineData);
  classRoutine.update({
    courseTitle : routineData.courseTitle,
    instructorName : routineData.instructorName,
    booldays : routineData.booldays,
    startTime : routineData.startTime,
    endTime : routineData.endTime,
    roomNum : routineData.roomNum
  },{
    where: {
      id : req.params.id
    }
  })
  .then((response)=>{
    res.status(201).json({
      message:'This is from routine update module.Data Updated!!',
    });
  })
  .catch(err => console.log(err));

})


// router.post('/:id',(req,res,next)=>{
//   // console.log('Routine Model');
//   const routineData = req.body;
//   // console.log('Router Module',routineData);
//   classRoutine.update({
//     courseTitle : routineData.courseTitle,
//     instructorName : routineData.instructorName,
//     booldays : routineData.booldays,
//     startTime : routineData.startTime,
//     endTime : routineData.endTime,
//     roomNum : routineData.roomNum
//   },{
//     where: {
//       id : req.params.id
//     }
//   })
//   .then((response)=>{
//     res.status(201).json({
//       message:'This is from routine update module.Data Updated!!',
//     });
//   })
//   .catch(err => console.log(err));

// })
router.post('/',(req,res,next)=>{
  const routine = req.body;
  let {user_id,courseTitle,instructorName,booldays,startTime,endTime,roomNum} = routine;
  console.log({user_id,courseTitle,instructorName,booldays,startTime,endTime,roomNum});
  console.log(routine);
  classRoutine.create({
    user_id,
    courseTitle,
    instructorName,
    booldays,
    startTime,
    endTime,
    roomNum
  }).then((response)=>{
    res.status(201).json({
        message:"Routine has been added",
        id:response.id
      })
  }).catch(err => console.log(err));

});

router.delete("/:id",(req,res,next)=>{
  // console.log(req.params.id);
  classRoutine.destroy({
    where: { id:req.params.id}
  })
  .then((response)=>{
    console.log(response);
    res.status(200).json(
    {
      message:"Routine data deleted successfully!"
    });
  })
  .catch(err => console.log(err));

})

module.exports = router;

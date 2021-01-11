import { Component, Inject, OnInit,ViewChild,OnDestroy } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RoutineData } from '../routine.model';
import { FormGroup,FormBuilder, Validators,NgForm } from '@angular/forms';
import  {RoutineService} from '../routine.service';
// import {Subscription} from 'rxjs';

@Component({
  selector: 'app-routine-edit',
  templateUrl: './routine-edit.component.html',
  styleUrls: ['./routine-edit.component.css']
})
export class RoutineEditComponent implements OnInit,OnDestroy {
  formData:RoutineData = null;
  routineForm:FormGroup;
  // private routineSub:Subscription;
  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(
    private formBuilder: FormBuilder,
    private routineService:RoutineService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef:MatDialogRef<RoutineEditComponent>
  ) { }

  days;
  ngOnInit(): void {
    // this.routineService.getRoutineDataById(this.data.id);
    // this.routineSub = this.routineService.getRoutineUpdateById()
    // .subscribe((routine:RoutineData)=>{

    //   this.formData = routine;
    //   console.log('Here In edit Sub:',this.formData);
    // });
    // console.log('Edit',this.data.routine[this.data.index]);
    this.formData = this.data.routine[this.data.index];
    this.days = [
      {name:'SUN',completed: false},
      {name:'MON',completed: false},
      {name:'TUE',completed: false},
      {name:'WED',completed: false},
      {name:'THU',completed: false},
    ];
    this.routineForm = this.formBuilder.group({
      courseTitle:[this.formData.courseTitle,[Validators.required]],
      instructorName:[this.formData.instructorName,[Validators.required]],
      booldays:[[false,false,false,false,false]],
      startTime:[this.formData.startTime,[Validators.required]],
      endTime:[this.formData.endTime,[Validators.required]],
      roomNum:[this.formData.roomNum,[Validators.required]],
    });
    for(let i =0;i<5;i++)
    {
      if(this.formData.booldays[i] == 'T')
      {
        this.days[i].completed = true;
        this.routineForm.value.booldays[i] = true;
      }
    }
    // console.log('Here In edit:',this.formData);
    // this.routineForm = Object.assign({},this.formData);
  }

  ngOnDestroy(){
    // this.routineSub.unsubscribe();
  }

  submit() {
    if (!this.routineForm.valid) {
      return;
    }
    // console.log(this.routineForm.value);
    // this.routineData.id = 1;
    let i = 0;
    let daysString="";
    for(let boolday of this.routineForm.value.booldays){
      if(boolday)
        daysString+='T';
      else
        daysString+='F';
    }

    const routineData1 : RoutineData = {
      id :1,
      user_id : this.formData.user_id,
      courseTitle : this.routineForm.value.courseTitle,
      instructorName : this.routineForm.value.instructorName,
      booldays : daysString,
      startTime : this.routineForm.value.startTime,
      endTime : this.routineForm.value.endTime,
      roomNum : this.routineForm.value.roomNum
    }
    //Submitting Routing to service
    this.routineService.updateRoutineDataById(this.formData.id,routineData1);
    this.clearForm();
    this.formDirective.resetForm();
    // this.data.push(this.routineForm.value);
  }

  clearForm(){
    this.days = [
      {name:'SUN',completed: false},
      {name:'MON',completed: false},
      {name:'TUS',completed: false},
      {name:'WED',completed: false},
      {name:'THU',completed: false},
    ];
    this.routineForm = this.formBuilder.group({
      courseTitle:'',
      instructorName:'',
      booldays:[[false,false,false,false,false]],
      startTime:'12:00 PM',
      endTime:'12:00 PM',
      roomNum:'',
    })
  }


  //Time
  startTimeVar = 12;
  endTimeVar = 12;
  timeState = false;
  onChangeStart(event){
    // console.log(event);
    let period = event.split(" ");
    if(period[1] == "PM")
    {
      period = period[0].split(":");
      this.startTimeVar = Number(period[0])+12;
    }
    else
    {
      period = period[0].split(":");
      this.startTimeVar = Number(period[0]);
    }
    // console.log(this.startTimeVar);
  }
  onChangeEnd(event){
    // console.log(event);
    let period = event.split(" ");
    if(period[1] == "PM")
    {
      period = period[0].split(":");
      this.endTimeVar = Number(period[0])+12;
    }
    else
    {
      period = period[0].split(":");
      this.endTimeVar = Number(period[0]);
    }
    if(this.startTimeVar >= this.endTimeVar)
    {
      this.timeState = true;
    }
    // console.log(this.endTimeVar);
  }
  onCheckChange(days,i,obj)
  {
    // console.log(days,i,obj);
    days[i].completed = obj.checked;
    this.routineForm.value.booldays[i] = obj.checked;
    // let j = 0;
    // for(let obj of this.days){
    //   console.log(obj.name,this.routineForm.value.booldays[j++]);
    // }
  }

}

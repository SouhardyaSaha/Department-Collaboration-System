import { Component, Inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { RoutineData } from '../routine.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { RoutineService } from '../routine.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

export interface CheckConflictR {
  startTime: string;
  endTime: string;
  id: number;
}
@Component({
  selector: 'app-routine-edit',
  templateUrl: './routine-edit.component.html',
  styleUrls: ['./routine-edit.component.css'],
})
export class RoutineEditComponent implements OnInit, OnDestroy {
  isValid = true;
  formData: RoutineData = null;
  routineForm: FormGroup;
  routineList: RoutineData[] = [];
  private routineSub: Subscription;
  // private routineSub:Subscription;
  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(
    private formBuilder: FormBuilder,
    private routineService: RoutineService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<RoutineEditComponent>,
  ) {}

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
      { name: 'SUN', completed: false },
      { name: 'MON', completed: false },
      { name: 'TUE', completed: false },
      { name: 'WED', completed: false },
      { name: 'THU', completed: false },
    ];
    this.routineForm = this.formBuilder.group({
      courseTitle: [this.formData.courseTitle, [Validators.required]],
      instructorName: [this.formData.instructorName, [Validators.required]],
      booldays: [[false, false, false, false, false]],
      startTime: [this.formData.startTime, [Validators.required]],
      endTime: [this.formData.endTime, [Validators.required]],
      roomNum: [this.formData.roomNum, [Validators.required]],
    });
    for (let i = 0; i < 5; i++) {
      if (this.formData.booldays[i] == 'T') {
        this.days[i].completed = true;
        this.routineForm.value.booldays[i] = true;
      }
    }
    //Routine List
    this.routineService.getRoutineData();
    this.routineSub = this.routineService
      .getRoutineUpdate()
      .subscribe((routines: RoutineData[]) => {
        this.routineList = routines;

        //  this.generateRoutineList();
      });
    // console.log('Here In edit:',this.formData);
    // this.routineForm = Object.assign({},this.formData);
  }

  ngOnDestroy() {
    this.routineSub.unsubscribe();
  }

  submit() {
    if (!this.routineForm.valid) {
      return;
    }
    // console.log(this.routineForm.valid);
    // this.routineData.id = 1;
    let i = 0;
    let daysString = '';
    this.isValid = false;
    for (let boolday of this.routineForm.value.booldays) {
      if (boolday) {
        daysString += 'T';
        this.isValid = true;
      } else daysString += 'F';
    }

    const routineData1: RoutineData = {
      id: 1,
      user_id: 1,
      courseTitle: this.routineForm.value.courseTitle,
      instructorName: this.routineForm.value.instructorName,
      booldays: daysString,
      startTime: this.routineForm.value.startTime,
      endTime: this.routineForm.value.endTime,
      roomNum: this.routineForm.value.roomNum,
    };

    //Check Conflict
    // console.log(routineData1);
    let isConflict = false;
    let unsortedArray: CheckConflictR[][] = [[], [], [], [], []];
    let index = 0;
    for (let i = 0; i < 5; i++) {
      if (routineData1.booldays[i] == 'T') {
        unsortedArray[i].push({
          startTime: routineData1.startTime,
          endTime: routineData1.endTime,
          id: index,
        });
      }
    }
    for (let routine of this.routineList) {
      for (let i = 0; i < 5; i++) {
        if (routine.booldays[i] == 'T') {
          unsortedArray[i].push({
            startTime: routine.startTime,
            endTime: routine.endTime,
            id: index,
          });
        }
      }
      index++;
    }
    let sortedArray: CheckConflictR[][] = [[], [], [], [], []];
    for (let i = 0; i < 5; i++) {
      sortedArray[i] = unsortedArray[i].sort((obj1, obj2) => {
        if (
          this.stringToInt(obj1.startTime) > this.stringToInt(obj2.startTime)
        ) {
          return 1;
        }
        if (
          this.stringToInt(obj1.startTime) < this.stringToInt(obj2.startTime)
        ) {
          return -1;
        }

        return 0;
      });
    }
    // console.log('From SA1');
    // for (let i = 0; i < 5; i++) {
    //   console.log(sortedArray[i]);
    // }
    for (let i = 0; i < 5; i++) {
      let size = sortedArray[i].length;
      for (let j = 0; j < size - 1; j++) {
        if (
          this.stringToInt(sortedArray[i][j].endTime) >
          this.stringToInt(sortedArray[i][j + 1].startTime)
        ) {
          isConflict = true;
          break;
        }
      }
    }

    if (!this.isValid) {
      this.sweetAlert(
        'Cancelled',
        'Please select a valid week days to add a course :)',
        'error',
      );
    }
    if (isConflict) {
      this.sweetAlert(
        'Cancelled',
        'Please select a free time schedule :)',
        'error',
      );
    } else {
      this.routineService.addRoutineData(routineData1);
      this.sweetAlert(
        'Success',
        'Added course to the routine suceessfully:)',
        'success',
      );
    }
    //Submitting Routing to service

    this.clearForm();
    this.formDirective.resetForm();

    // this.data.push(this.routineForm.value);
  }

  clearForm() {
    this.days = [
      { name: 'SUN', completed: false },
      { name: 'MON', completed: false },
      { name: 'TUS', completed: false },
      { name: 'WED', completed: false },
      { name: 'THU', completed: false },
    ];
    this.routineForm = this.formBuilder.group({
      courseTitle: '',
      instructorName: '',
      booldays: [[false, false, false, false, false]],
      startTime: '12:00 PM',
      endTime: '12:00 PM',
      roomNum: '',
    });
  }
  stringToInt(event) {
    // console.log(event);
    let period = event.split(' ');
    let values = 0;
    if (period[1] == 'PM') {
      period = period[0].split(':');
      if (period[0] != '12') values = Number(period[0]) + 12;
      else values = Number(period[0]);
    } else {
      period = period[0].split(':');
      values = Number(period[0]);
    }
    // console.log(values);
    return values;
  }

  //Time
  startTimeVar = 12;
  endTimeVar = 12;
  timeState = false;
  onChangeStart(event) {
    // console.log(event);
    let period = event.split(' ');
    if (period[1] == 'PM') {
      period = period[0].split(':');
      this.startTimeVar = Number(period[0]) + 12;
    } else {
      period = period[0].split(':');
      this.startTimeVar = Number(period[0]);
    }
    // console.log(this.startTimeVar);
  }
  onChangeEnd(event) {
    // console.log(event);
    let period = event.split(' ');
    if (period[1] == 'PM') {
      period = period[0].split(':');
      this.endTimeVar = Number(period[0]) + 12;
    } else {
      period = period[0].split(':');
      this.endTimeVar = Number(period[0]);
    }
    if (this.startTimeVar >= this.endTimeVar) {
      this.timeState = true;
    }
    // console.log(this.endTimeVar);
  }
  onCheckChange(days, i, obj) {
    // console.log(days,i,obj);
    days[i].completed = obj.checked;
    this.routineForm.value.booldays[i] = obj.checked;
    // let j = 0;
    // for(let obj of this.days){
    //   console.log(obj.name,this.routineForm.value.booldays[j++]);
    // }
  }
  sweetAlert(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
}

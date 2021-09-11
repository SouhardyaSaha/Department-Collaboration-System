import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { RoutineData } from './routine.model';
import { RoutineService } from './routine.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { Subscription } from 'rxjs';
import { values } from 'sequelize/types/lib/operators';
import { TimeValidator } from './shared/time.validator';
import Swal from 'sweetalert2';
import { title } from 'process';
import { textChangeRangeIsUnchanged } from 'typescript';

export interface PeriodicElement {
  position1: string;
}
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
export interface TestRoutine {
  time: string;
  id: number;
}
export interface CheckConflictR {
  startTime: string;
  endTime: string;
  id: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position1: 'SUN' },
  { position1: 'MON' },
  { position1: 'TUS' },
  { position1: 'WED' },
  { position1: 'THU' },
];

@Component({
  selector: 'app-routine-generator',
  templateUrl: './routine-generator.component.html',
  styleUrls: ['./routine-generator.component.css'],
})
export class RoutineGeneratorComponent implements OnInit {
  isValid = true;
  tabIndex = 0;
  routineForm: FormGroup;
  routineData: RoutineData;
  routineList: RoutineData[] = [];
  private routineSub: Subscription;
  @ViewChild('formDirective') private formDirective: NgForm;

  onTabClick(index) {
    this.tabIndex = index;
  }

  displayedColumns: string[] = [
    'Position1',
    'Position2',
    'Position3',
    'Position4',
    'Position5',
    'Position6',
    'Position7',
    'Position8',
    'Position9',
    'Position10',
  ];
  dataSource = ELEMENT_DATA;
  // data:RoutineData[];

  constructor(
    private formBuilder: FormBuilder,
    private routineService: RoutineService,
    private exportAsService: ExportAsService,
  ) {}
  days;
  ngOnInit(): void {
    this.days = [
      { name: 'SUN', completed: false },
      { name: 'MON', completed: false },
      { name: 'TUE', completed: false },
      { name: 'WED', completed: false },
      { name: 'THU', completed: false },
    ];
    this.routineForm = this.formBuilder.group(
      {
        courseTitle: ['', [Validators.required]],
        instructorName: ['', [Validators.required]],
        booldays: [[false, false, false, false, false]],
        startTime: ['12:00 PM', [Validators.required]],
        endTime: ['1:00 PM', [Validators.required]],
        roomNum: ['', [Validators.required]],
      },
      { validator: TimeValidator },
    );

    //Routine List
    this.routineService.getRoutineData();
    this.routineSub = this.routineService
      .getRoutineUpdate()
      .subscribe((routines: RoutineData[]) => {
        this.routineList = routines;
        this.generateRoutineList();
      });

    // for(let obj of this.days){
    //   console.log(obj.name,obj.completed);
    // }
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
    this.routineForm = this.formBuilder.group(
      {
        courseTitle: '',
        instructorName: '',
        booldays: [[false, false, false, false, false]],
        startTime: '12:00 PM',
        endTime: '1:00 PM',
        roomNum: '',
      },
      { validator: TimeValidator },
    );
  }
  onAddItem() {
    // console.log('Add');
  }
  onEditItem() {
    // console.log('Edit');
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
    this.isValid = true;

    const edTime = this.stringToInt(event);
    // console.log(edTime);
    if (edTime > 17) {
      this.isValid = false;
    }
    // console.log(event);
    // let period = event.split(" ");
    // if(period[1] == "PM")
    // {
    //   period = period[0].split(":");
    //   this.endTimeVar = Number(period[0])+12;
    // }
    // else
    // {
    //   period = period[0].split(":");
    //   this.endTimeVar = Number(period[0]);
    // }
    // if(this.startTimeVar >= this.endTimeVar)
    // {
    //   this.timeState = true;
    // }
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

  showRoutine: Tile[] = [];
  multi: RoutineData[][] = [[], [], [], [], []];
  tiles: Tile[];
  //Generating the Routine list
  generateRoutineList() {
    // console.log('Here I am');
    let unsortedArray: TestRoutine[][] = [[], [], [], [], []];
    let index = 0;
    for (let routine of this.routineList) {
      for (let i = 0; i < 5; i++) {
        if (routine.booldays[i] == 'T') {
          this.multi[i].push(routine);
          unsortedArray[i].push({
            time: routine.startTime,
            id: index,
          });
        }
      }
      index++;
    }
    let sortedArray: TestRoutine[][] = [[], [], [], [], []];
    for (let i = 0; i < 5; i++) {
      sortedArray[i] = unsortedArray[i].sort((obj1, obj2) => {
        if (this.stringToInt(obj1.time) > this.stringToInt(obj2.time)) {
          return 1;
        }
        if (this.stringToInt(obj1.time) < this.stringToInt(obj2.time)) {
          return -1;
        }

        return 0;
      });
    }
    // console.log('From SA');
    // for (let i = 0; i < 5; i++) {
    //   console.log(sortedArray[i]);
    // }

    //Showing in the grid
    this.tiles = [
      { text: 'Time & Date', cols: 1, rows: 1, color: 'lightblue' },
      { text: '8.00-9.00', cols: 1, rows: 1, color: 'lightblue' },
      { text: '9.00-10.00', cols: 1, rows: 1, color: 'lightblue' },
      { text: '10.00-11.00', cols: 1, rows: 1, color: 'lightblue' },
      { text: '11.00-12.00', cols: 1, rows: 1, color: 'lightblue' },
      { text: '12.00-1.00', cols: 1, rows: 1, color: 'lightblue' },
      { text: '1.00-2.00', cols: 1, rows: 1, color: 'lightblue' },
      { text: '2.00-3.00', cols: 1, rows: 1, color: 'lightblue' },
      { text: '3.00-4.00', cols: 1, rows: 1, color: 'lightblue' },
      { text: '4.00-5.00', cols: 1, rows: 1, color: 'lightblue' },
    ];

    let array: { text: string; color: string }[] = [
      { text: 'SUN', color: '#439775' },
      { text: 'MON', color: '#B2ABBF' },
      { text: 'TUE', color: '#B1B5C8' },
      { text: 'WED', color: '#BFD5E2' },
      { text: 'THU', color: '#C7EBF0' },
    ];
    // console.log(sortedArray[0][0]);
    for (let v = 0; v < 5; v++) {
      this.tiles.push({
        text: array[v].text,
        cols: 1,
        rows: 1,
        color: array[v].color,
      });
      let initialcols = 0;
      if (sortedArray[v].length > 0) {
        initialcols =
          this.stringToInt(this.routineList[sortedArray[v][0].id].startTime) -
          8;
      } else {
        initialcols = 9;
      }
      this.tiles.push({ text: '', cols: initialcols, rows: 1, color: 'none' });
      let circle = 0,
        preVal = 0;
      for (let item of sortedArray[v]) {
        if (circle > 0) {
          let midDis = 0;
          midDis =
            this.stringToInt(this.routineList[item.id].startTime) - preVal;
          initialcols += midDis;
          this.tiles.push({ text: '', cols: midDis, rows: 1, color: '' });
        }
        // console.log(item.id,item.time);
        // console.log(this.routineList[item.id].courseTitle);
        preVal = this.stringToInt(this.routineList[item.id].endTime);
        let textval =
            this.routineList[item.id].courseTitle +
            '\n' +
            this.routineList[item.id].instructorName +
            '\n' +
            this.routineList[item.id].roomNum,
          colsval =
            preVal - this.stringToInt(this.routineList[item.id].startTime);
        initialcols += colsval;
        // console.log(textval);
        this.tiles.push({
          text: textval,
          cols: colsval,
          rows: 1,
          color: array[v].color,
        });
        circle++;
      }
      initialcols = 9 - initialcols;
      // console.log(initialcols);
      if (initialcols < 0) {
        initialcols = 0;
      }
      if (initialcols != 0)
        this.tiles.push({ text: '', cols: initialcols, rows: 1, color: '' });
      // console.log(v, this.tiles);
    }

    // console.log(this.tiles);
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

  //Download
  exportAsPngConfig: ExportAsConfig = {
    type: 'png', // the type you want to download
    elementIdOrContent: 'hello', // the id of html/table element
  };
  exportAsPdfConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'hello', // the id of html/table element
  };

  onDownloadItem(val: number) {
    // console.log('Download');
    // download the file using old school javascript method
    if (val == 1) {
      this.exportAsService
        .save(this.exportAsPngConfig, 'ClassRoutine')
        .subscribe(() => {
          // save started
        });
    } else {
      this.exportAsService
        .save(this.exportAsPdfConfig, 'ClassRoutine')
        .subscribe(() => {
          // save started
        });
    }

    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    // this.exportAsService.get(this.exportAsConfig).subscribe(content => {
    //   console.log(content);
    // });
  }
  id = [];
  onDelete() {
    // console.log('Delete operation', this.routineList);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this routine file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then(result => {
      if (result.value) {
        for (let item of this.routineList) {
          console.log(item.id);
          this.routineService.deleteRoutineData(item.id);
        }
        Swal.fire('Deleted!', 'Your routine file has been deleted.', 'success');
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your routine is safe :)', 'error');
      }
    });
  }
  onSweetAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then(result => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success',
        );
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }
  sweetAlert(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
}

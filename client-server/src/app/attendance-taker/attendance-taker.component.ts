import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AttendanceFormComponent } from './attendance-form/attendance-form.component';

@Component({
  selector: 'app-attendance-taker',
  templateUrl: './attendance-taker.component.html',
  styleUrls: ['./attendance-taker.component.css'],
})
export class AttendanceTakerComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  takeAttendance() {
    console.log('New Attendance!');
    const dialogConfig = new MatDialogConfig();
    // let id = this.routines[index].id;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { message: 'New Form' };
    this.dialog.open(AttendanceFormComponent, dialogConfig);
  }
}

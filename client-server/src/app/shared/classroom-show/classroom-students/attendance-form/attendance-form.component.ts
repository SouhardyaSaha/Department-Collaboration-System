import { Component, Inject, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AttendanceData } from '../attendance.model';
import { AttendanceService } from '../attendance.service';
import { Student } from 'src/app/shared/classroom/models/classroom.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { popupNotification } from 'src/app/shared/utils.class';

@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.css'],
})
export class AttendanceFormComponent implements OnInit {
  displayedColumns: string[] = ['select', 'registration', 'name'];
  dataSource: MatTableDataSource<Student>;
  selection: SelectionModel<Student>;
  students: Student[];
  classroomId: number;
  isLoading: boolean = false;
  closeTab: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private attendanceService: AttendanceService,
  ) {}

  ngOnInit(): void {
    this.students = this.data.students;
    this.classroomId = this.data.classroomId;
    this.dataSource = new MatTableDataSource(this.students);
    this.selection = new SelectionModel(true, []);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Student): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.registration
    }`;
  }

  clearAttendance() {
    this.selection.clear();
  }

  onSaveAttendance() {
    this.isLoading = true;
    const s_students = this.selection.selected;
    const absent_student_ids: number[] = [];
    s_students.forEach(s_student => {
      absent_student_ids.push(s_student.id);
    });
    console.log(absent_student_ids, +this.classroomId);
    this.attendanceService
      .createAttendance(this.classroomId, absent_student_ids)
      .subscribe(
        res => {
          this.isLoading = false;
          popupNotification('Success', 'Attendance Submitted', 'success');
          this.clearAttendance();
          console.log(res);
        },
        err => {
          this.isLoading = false;
          console.log(err);
        },
      );
  }
}

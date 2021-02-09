import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../../classroom/models/classroom.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IndividualStudentComponent } from './individual-student/individual-student.component';
import { AttendanceFormComponent } from './attendance-form/attendance-form.component';

export interface studentList {
  student: Student;
  totalClass: number;
  absent: number;
  percentage: number;
}

@Component({
  selector: 'app-classroom-students',
  templateUrl: './classroom-students.component.html',
  styleUrls: ['./classroom-students.component.css'],
})
export class ClassroomStudentsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<studentList>;
  selection = new SelectionModel<Student>(true, []);
  @Input() students: Student[];
  constructor(private dialog: MatDialog) {}
  student: studentList[] = [];
  ngOnInit(): void {
    console.log(this.students);

    // for (let item of this.students) {
    //   this.student.push({
    //     student: item,
    //     totalClass: 5,
    //     absent: 1,
    //     percentage: 4,
    //   });
    // }
    console.log('Hello', this.student);
    this.dataSource = new MatTableDataSource(this.student);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = [
    // 'select',
    // 'user_img_uri',
    'registration',
    'name',
    'email',
    'absence',
    'percentage',
    'actions',
  ];

  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected()
  //     ? this.selection.clear()
  //     : this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: Student): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
  //     row.id
  //   }`;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRemoveStudents() {
    let studentsId: number[] = [];
    this.selection.selected.forEach(student => {
      studentsId.push(student.id);
    });
    console.log(this.selection.selected);
  }
  onDelete(id) {}
  onDetails(id) {
    // console.log(id);
    console.log('Details of id :' + id);
    const dialogConfig = new MatDialogConfig();
    // let id = this.routines[index].id;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '60%';
    dialogConfig.data = { message: 'Individual Form', id: id };
    this.dialog.open(IndividualStudentComponent, dialogConfig);
  }
  openAttendanceDialog() {
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

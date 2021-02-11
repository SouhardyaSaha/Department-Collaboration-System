import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../../classroom/models/classroom.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IndividualStudentComponent } from './individual-student/individual-student.component';
import { AttendanceFormComponent } from './attendance-form/attendance-form.component';
import { ActivatedRoute } from '@angular/router';

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
  dataSource: MatTableDataSource<Student>;
  selection = new SelectionModel<Student>(true, []);
  classroomId: number;
  @Input() students: Student[];
  constructor(private dialog: MatDialog, private route: ActivatedRoute) {}
  // student: studentList[] = [];
  ngOnInit(): void {
    console.log(this.students);
    this.dataSource = new MatTableDataSource(this.students);
    this.classroomId = this.route.snapshot.params['id'];
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = [
    // 'select',
    // 'user_img_uri',
    'name',
    'registration',
    'email',
    'actions',
    // 'absence',
    // 'percentage',
  ];

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
    const dialogConfig: MatDialogConfig = {
      autoFocus: true,
      disableClose: true,
      width: '60%',
      data: {
        studentId: id,
        classroomId: this.classroomId,
      },
    };
    this.dialog.open(IndividualStudentComponent, dialogConfig);
  }

  openAttendanceDialog() {
    console.log('New Attendance!');
    const dialogConfig: MatDialogConfig = {
      autoFocus: true,
      disableClose: true,
      width: '60%',
      data: {
        students: this.students,
        classroomId: this.classroomId,
      },
    };
    // let id = this.routines[index].id;

    this.dialog.open(AttendanceFormComponent, dialogConfig);
  }
}

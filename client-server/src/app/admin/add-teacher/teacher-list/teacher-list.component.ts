import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/auth/user.model';
import { Teacher } from '../../models/classroom.model';
// import {User} from '../../models/classroom.model'
import { TeacherService } from '../teacher.service';
export interface showTeacher {
  name: string;
  designation: string;
  email: string;
}
@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
})
export class TeacherListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  isLoading = false;
  dataSource: MatTableDataSource<showTeacher>;
  selection = new SelectionModel<showTeacher>(true, []);
  teachers: showTeacher[];
  user: User;
  constructor(private teacherService: TeacherService) {}
  list = [];
  ngOnInit(): void {
    this.isLoading = true;
    this.teacherService.getTeachers().subscribe(res => {
      this.isLoading = false;
      // console.log('Teacher-List', res.data.teachers.values);
      // // let list: any[];;
      // const hell = res.data.teachers;
      // console.log('hell', hell);
      // for (let x of hell) {
      //   console.log();
      // }
      // this.list = res.data.teachers.map(o => {
      //   return {
      //     name: o.designation,
      //     // email: o.user.name,
      //   };
      // });
      // console.log('Here', this.list);
      this.dataSource = new MatTableDataSource(this.teachers);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = [
    // 'select',
    // 'user_img_uri',
    'name',
    'designation',
    'email',
  ];

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
  // checkboxLabel(row?: Teacher): string {
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
      // studentsId.push(student.id);
    });
    console.log(this.selection.selected);
  }
}

import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/auth/user.model';
import { Teacher } from '../../models/classroom.model';
// import {User} from '../../models/classroom.model'
import { TeacherService } from '../teacher.service';
// import {Teacher}  from '../teacher.model';
@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css'],
})
export class TeacherListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  isLoading = false;
  dataSource: MatTableDataSource<Teacher>;
  selection = new SelectionModel<Teacher>(true, []);
  teachers: Teacher[];
  user: User;
  constructor(private teacherService: TeacherService) {}
  list = [];
  ngOnInit(): void {
    this.isLoading = true;
    this.teacherService.getTeachers().subscribe(res => {
      // this.isLoading = false;
      // console.log('Teacher-List', res.data.teachers);
      // // let list: any[];;
      // const hell = res.data.teachers;
      // console.log('hell', hell);
      // for (let x of hell) {
      //   console.log();
      // }
      // this.teachers = res.data.teachers;
      // res.data.teachers.map(o => {
      //   return {
      //     name: o.user.name,
      //     designation: o.designation,
      //     email: o.user.email,
      //     id: o.user.id,
      //     // email: o.user.name,
      //   };
      // });
      // console.log('Here', this.teachers);
    });
    this.teacherService.getTeacherUpdate().subscribe((teachers: Teacher[]) => {
      this.isLoading = false;
      this.teachers = teachers;
      this.dataSource = new MatTableDataSource(this.teachers);
    });
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = [
    // 'select',
    // 'user_img_uri',
    'name',
    'designation',
    'email',
    'actions',
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRemoveTeacher(id: number) {
    // let studentsId: number[] = [];
    // this.selection.selected.forEach(student => {
    //   // studentsId.push(student.id);
    // });
    // console.log(this.selection.selected);
    this.isLoading = true;
    // console.log(id);
    this.teacherService.deleteUserById(id).subscribe(res => {
      // console.log('From all-teacher ts', res.status);
      this.isLoading = false;
    });
  }
}

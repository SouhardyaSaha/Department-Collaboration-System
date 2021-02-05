import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../../classroom/models/classroom.model';

// export interface PeriodicElement {
//   id: number;
//   name: string;
//   user_img_uri: string;
//   registration: number;
//   email: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     id: 23,
//     user_img_uri: 'https://ui-avatars.com/api/?name=John+Doe',
//     name: 'Hydrogen',
//     registration: 2017831024,
//     email: 'souhardyasaha98@gmail.com',
//   },
//   {
//     id: 23,
//     user_img_uri: 'https://ui-avatars.com/api/?name=John+Doe',
//     name: 'Helium',
//     registration: 2017831025,
//     email: 'saha98@gmail.com',
//   },
//   {
//     id: 23,
//     user_img_uri: 'https://ui-avatars.com/api/?name=John+Doe',
//     name: 'Lithium',
//     registration: 2017831026,
//     email: 'souhardya98@gmail.com',
//   },
//   {
//     id: 23,
//     user_img_uri: 'https://ui-avatars.com/api/?name=John+Doe',
//     name: 'Beryllium',
//     registration: 2017831027,
//     email: 'sou98@gmail.com',
//   },
//   {
//     id: 23,
//     user_img_uri: 'https://ui-avatars.com/api/?name=John+Doe',
//     name: 'Beryllium',
//     registration: 2017831027,
//     email: 'sou98@gmail.com',
//   },
//   {
//     id: 23,
//     user_img_uri: 'https://ui-avatars.com/api/?name=John+Doe',
//     name: 'Beryllium',
//     registration: 2017831027,
//     email: 'sou98@gmail.com',
//   },
//   {
//     id: 23,
//     user_img_uri: 'https://ui-avatars.com/api/?name=John+Doe',
//     name: 'Beryllium',
//     registration: 2017831027,
//     email: 'sou98@gmail.com',
//   },
// ];

@Component({
  selector: 'app-classroom-students',
  templateUrl: './classroom-students.component.html',
  styleUrls: ['./classroom-students.component.css'],
})
export class ClassroomStudentsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Student>;
  selection = new SelectionModel<Student>(true, []);
  @Input() students: Student[];
  constructor() {}

  ngOnInit(): void {
    console.log(this.students);
    this.dataSource = new MatTableDataSource(this.students);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = [
    'select',
    // 'user_img_uri',
    'name',
    'registration',
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
  checkboxLabel(row?: Student): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id
    }`;
  }

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
}

import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../../models/classroom.model';
import { StudentService } from '../student.service';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  isLoading = false;
  dataSource: MatTableDataSource<Student>;
  selection = new SelectionModel<Student>(true, []);
  // @Input() students: Student[];
  students: Student[];
  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.studentService.getStudents().subscribe(() => {});
    this.studentService.getstudentUpdate().subscribe((students: Student[]) => {
      this.isLoading = false;
      this.students = students;
      this.dataSource = new MatTableDataSource(this.students);
    });
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  displayedColumns: string[] = [
    // 'select',
    // 'user_img_uri',
    'name',
    'registration',
    'email',
    'session',
    'actions',
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

  // onRemoveStudents() {
  //   let studentsId: number[] = [];
  //   this.selection.selected.forEach(student => {
  //     studentsId.push(student.id);
  //   });
  //   console.log(this.selection.selected);
  // }
  onRemoveStudent(id: number) {
    // let studentsId: number[] = [];
    // this.selection.selected.forEach(student => {
    //   // studentsId.push(student.id);
    // });
    // console.log(this.selection.selected);
    this.isLoading = true;
    // console.log(id);
    this.studentService.deleteUserById(id).subscribe(res => {
      // console.log('From all-teacher ts', res.status);
      this.isLoading = false;
    });
  }
}

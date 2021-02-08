import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CourseModel } from '../course.model';
import { IndividualCourseComponent } from '../individual-course/individual-course.component';
import { MatSort } from '@angular/material/sort';

export interface DataModel {
  id: number;
  courseTitle: string;
  credit: string;
  session: string;
  isOptional: boolean;
}
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'courseTitle',
    'credit',
    'session',
    'isOptional',
    'actions',
  ];
  dataSource: MatTableDataSource<DataModel>;
  courses: DataModel[];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.courses = Array.from([
      {
        id: 1,
        courseTitle: 'A',
        credit: '3',
        session: '1/1',
        isOptional: false,
      },
      {
        id: 2,
        courseTitle: 'B',
        credit: '3',
        session: '1/2',
        isOptional: true,
      },
      {
        id: 3,
        courseTitle: 'C',
        credit: '3',
        session: '2/1',
        isOptional: false,
      },
      {
        id: 4,
        courseTitle: 'DA',
        credit: '3',
        session: '3/1',
        isOptional: false,
      },
      {
        id: 5,
        courseTitle: 'AD',
        credit: '3',
        session: '4/1',
        isOptional: true,
      },
      {
        id: 6,
        courseTitle: 'A',
        credit: '3',
        session: '1/1',
        isOptional: false,
      },
      {
        id: 7,
        courseTitle: 'B',
        credit: '3',
        session: '1/2',
        isOptional: true,
      },
    ]);

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.courses);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
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
    dialogConfig.data = {
      message: 'Individual Form',
      id: id,
      courses: this.courses,
    };
    this.dialog.open(IndividualCourseComponent, dialogConfig);
  }
}

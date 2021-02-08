import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CourseModel } from '../course.model';
import { IndividualCourseComponent } from '../individual-course/individual-course.component';
import { MatSort } from '@angular/material/sort';

export interface DataModel {
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
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    const users = Array.from([
      {
        courseTitle: 'A',
        credit: '3',
        session: '1/1',
        isOptional: false,
      },
      {
        courseTitle: 'B',
        credit: '3',
        session: '1/2',
        isOptional: true,
      },
      {
        courseTitle: 'C',
        credit: '3',
        session: '2/1',
        isOptional: false,
      },
      {
        courseTitle: 'DA',
        credit: '3',
        session: '3/1',
        isOptional: false,
      },
      {
        courseTitle: 'AD',
        credit: '3',
        session: '4/1',
        isOptional: true,
      },
      {
        courseTitle: 'A',
        credit: '3',
        session: '1/1',
        isOptional: false,
      },
      {
        courseTitle: 'B',
        credit: '3',
        session: '1/2',
        isOptional: true,
      },
      {
        courseTitle: 'C',
        credit: '3',
        session: '2/1',
        isOptional: false,
      },
      {
        courseTitle: 'DA',
        credit: '3',
        session: '3/1',
        isOptional: false,
      },
      {
        courseTitle: 'AD',
        credit: '3',
        session: '4/1',
        isOptional: true,
      },
    ]);

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
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
    dialogConfig.data = { message: 'Individual Form', id: id };
    this.dialog.open(IndividualCourseComponent, dialogConfig);
  }
}

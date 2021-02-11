import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CourseModel } from '../course.model';
import { IndividualCourseComponent } from '../individual-course/individual-course.component';
import { MatSort } from '@angular/material/sort';
import { CourseService } from '../course.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { EditCourseComponent } from '../edit-course/edit-course.component';
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
  dataSource: MatTableDataSource<CourseModel>;
  private courseSub: Subscription;
  courses: CourseModel[];
  loadingData = false;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private courseService: CourseService,
  ) {}

  ngOnInit(): void {
    this.loadingData = true;

    this.courseService.getCourseData();
    this.courseSub = this.courseService
      .getCourseUpdate()
      .subscribe((courses: CourseModel[]) => {
        this.loadingData = false;
        console.log('Get', courses);
        this.courses = courses;
        this.dataSource = new MatTableDataSource(this.courses);
      });

    // this.courses = Array.from([
    //   {
    //     id: 1,
    //     courseTitle: 'A',
    //     credit: '3',
    //     session: '1/1',
    //     isOptional: false,
    //   },
    //   {
    //     id: 2,
    //     courseTitle: 'B',
    //     credit: '3',
    //     session: '1/2',
    //     isOptional: true,
    //   },
    //   {
    //     id: 3,
    //     courseTitle: 'C',
    //     credit: '3',
    //     session: '2/1',
    //     isOptional: false,
    //   },
    //   {
    //     id: 4,
    //     courseTitle: 'DA',
    //     credit: '3',
    //     session: '3/1',
    //     isOptional: false,
    //   },
    //   {
    //     id: 5,
    //     courseTitle: 'AD',
    //     credit: '3',
    //     session: '4/1',
    //     isOptional: true,
    //   },
    //   {
    //     id: 6,
    //     courseTitle: 'A',
    //     credit: '3',
    //     session: '1/1',
    //     isOptional: false,
    //   },
    //   {
    //     id: 7,
    //     courseTitle: 'B',
    //     credit: '3',
    //     session: '1/2',
    //     isOptional: true,
    //   },
    // ]);

    // Assign the data to the data source for the table to render
    // console.log(this.courses);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    }, 5000);
  }
  ngOnDestroy() {
    this.courseSub.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  onDelete(index) {
    if (confirm('Are you sure want to delete?')) {
      this.courseService.deleteCourseData(index);
      this.sweetAlert(
        'Deleted!',
        'Course has been successfully removed.',
        'success',
      );
    }
  }
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
  onEdit(id, course) {
    console.log('Edit of id :' + id, course);
    const dialogConfig = new MatDialogConfig();
    // let id = this.routines[index].id;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '60%';
    dialogConfig.data = {
      message: 'Individual Edit Form',
      id: id,
      course,
    };
    this.dialog.open(EditCourseComponent, dialogConfig);
  }
  sweetAlert(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
}

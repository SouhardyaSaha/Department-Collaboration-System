import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CourseModel } from '../course.model';
@Component({
  selector: 'app-individual-course',
  templateUrl: './individual-course.component.html',
  styleUrls: ['./individual-course.component.css'],
})
export class IndividualCourseComponent implements OnInit {
  individualCourse: CourseModel;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<IndividualCourseComponent>,
  ) {}

  ngOnInit(): void {
    console.log('Hello', this.data.courses);
    var dataFetched;
    // this.individualCourse = this.data.courses[this.data.id];
    for (let item of this.data.courses) {
      if (item.id == this.data.id) {
        dataFetched = item;
        break;
      }
    }
    // console.log(dataFetched);
    this.individualCourse = {
      id: 1,
      admin_id: 1,
      course_title: dataFetched.course_title,
      credit: dataFetched.credit,
      session: dataFetched.session,
      details: dataFetched.details,
      optional: dataFetched.optional,
    };
  }
}

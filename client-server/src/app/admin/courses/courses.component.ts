import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCourseComponent } from './add-course/add-course.component';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  onCLick() {
    console.log('Add course pop-up');
    const dialogConfig = new MatDialogConfig();
    // let id = this.routines[index].id;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '50%';
    dialogConfig.data = { string: 'show' };
    this.dialog.open(AddCourseComponent, dialogConfig);
  }
}

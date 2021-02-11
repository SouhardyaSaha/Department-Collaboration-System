import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { CourseModel } from '../course.model';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent implements OnInit {
  editCourseForm: FormGroup;
  semesters: string[] = [
    '1/1',
    '1/2',
    '2/1',
    '2/2',
    '3/1',
    '3/2',
    '4/1',
    '4/2',
  ];
  @ViewChild('formDirective') private formDirective: NgForm;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditCourseComponent>,
  ) {}

  ngOnInit(): void {
    console.log('From edit', this.data);
    this.editCourseForm = this.formBuilder.group({
      courseTitle: [this.data.course.course_title, [Validators.required]],
      credit: [this.data.course.credit, [Validators.required]],
      session: [this.data.course.session, [Validators.required]],
      details: [this.data.course.details, [Validators.required]],
      optional: this.data.course.optional,
    });
  }
  submit() {
    console.log(this.editCourseForm.status);
    const formData: CourseModel = {
      id: 1,
      admin_id: 1,
      course_title: this.editCourseForm.value.courseTitle,
      credit: this.editCourseForm.value.credit,
      session: this.editCourseForm.value.session,
      details: this.editCourseForm.value.details,
      optional: this.editCourseForm.value.optional,
    };
    console.log('From Submit', formData);

    // console.log(this.editCourseForm);
    // const postData:CourseModel={
    //     admin_id:1,
    //     course_title:this.editCourseForm
    // }
    this.courseService.updateCourseData(this.data.id, formData);
    this.sweetAlert(
      'Success',
      'Added course to the routine suceessfully:)',
      'success',
    );
    this.clearForm();
    this.formDirective.resetForm();
  }
  clearForm() {
    this.editCourseForm.reset();
  }
  sweetAlert(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
}

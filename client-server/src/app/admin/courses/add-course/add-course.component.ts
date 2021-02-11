// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { CourseModel } from '.././course.model';
import { CourseService } from '.././course.service';
// import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  sessionForm: FormGroup;
  // private courseSub: Subscription;
  checked = false;
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
  ) {}

  ngOnInit(): void {
    this.sessionForm = this.formBuilder.group({
      courseTitle: ['', [Validators.required]],
      credit: ['', [Validators.required]],
      session: ['', [Validators.required]],
      details: ['', [Validators.required]],
      optional: false,
    });
  }
  ngOnDestroy() {
    // this.courseSub.unsubscribe();
  }

  submit() {
    console.log(this.sessionForm.status);
    const formData: CourseModel = {
      id: 1,
      admin_id: 1,
      course_title: this.sessionForm.value.courseTitle,
      credit: this.sessionForm.value.credit,
      session: this.sessionForm.value.session,
      details: this.sessionForm.value.details,
      optional: this.sessionForm.value.optional,
    };
    console.log('From Submit', formData);

    // console.log(this.sessionForm);
    // const postData:CourseModel={
    //     admin_id:1,
    //     course_title:this.sessionForm
    // }
    this.courseService.postCourseData(formData);
    this.sweetAlert(
      'Success',
      'Added course to the routine suceessfully:)',
      'success',
    );
    this.clearForm();
    this.formDirective.resetForm();
  }
  clearForm() {
    this.sessionForm.reset();
  }
  sweetAlert(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
}

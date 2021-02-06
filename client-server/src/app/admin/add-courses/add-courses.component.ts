import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css'],
})
export class AddCoursesComponent implements OnInit {
  sessionForm: FormGroup;
  checked = false;
  semesters: string[] = [
    '1/1',
    '1/2',
    '2/1',
    '2/2',
    '3/1',
    '3/2',
    '4/1',
    '4,2',
  ];
  @ViewChild('formDirective') private formDirective: NgForm;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.sessionForm = this.formBuilder.group({
      courseTitle: ['', [Validators.required]],
      credit: ['', [Validators.required]],
      session: ['', [Validators.required]],
      details: '',
      optional: [false],
    });
  }
  clearForm() {
    this.sessionForm = this.formBuilder.group({
      courseTitle: '',
      credit: '',
      session: '',
      details: '',
      optional: [false],
    });
  }
  submit() {
    console.log('From Submit', this.sessionForm);
  }
}

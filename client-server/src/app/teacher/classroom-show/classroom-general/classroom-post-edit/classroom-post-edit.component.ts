import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-classroom-post-edit',
  templateUrl: './classroom-post-edit.component.html',
  styleUrls: ['./classroom-post-edit.component.css'],
})
export class ClassroomPostEditComponent implements OnInit {
  classroomPostForm: FormGroup;

  sessions = [
    {
      id: 1,
      name: '2017-18',
    },
    {
      id: 1,
      name: '2016-17',
    },
    {
      id: 1,
      name: '2018-19',
    },
  ];

  courses = [
    {
      id: 1,
      title: 'Data Science',
    },
    {
      id: 2,
      title: 'Data Structure',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.formInit();
  }

  private formInit() {
    let post = '';

    this.classroomPostForm = new FormGroup({
      post: new FormControl(post, [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.classroomPostForm.value);
  }
}

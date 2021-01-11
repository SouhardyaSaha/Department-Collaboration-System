import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-classroom-edit',
  templateUrl: './classroom-edit.component.html',
  styleUrls: ['./classroom-edit.component.css'],
})
export class ClassroomEditComponent implements OnInit {
  classroomForm: FormGroup;
  
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
    let session = '';
    let course = '';
    let medicineDetails = new FormArray([]);

    this.classroomForm = new FormGroup({
      session: new FormControl(session, [Validators.required]),
      course: new FormControl(course, [Validators.required]),
      medicines: medicineDetails,
    });
  }

  onAddMedicine() {
    (<FormArray>this.classroomForm.get('medicines')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        per_day: new FormControl(null, [
          Validators.required,
          Validators.min(1),
        ]),
        days: new FormControl(null, [Validators.required, Validators.min(1)]),
        note: new FormControl(null, Validators.required),
      }),
    );
  }

  onDeleteMedicine(index: number) {
    (<FormArray>this.classroomForm.get('medicines')).removeAt(+index);
  }

  onSubmit() {
    console.log(this.classroomForm.value);
  }
}

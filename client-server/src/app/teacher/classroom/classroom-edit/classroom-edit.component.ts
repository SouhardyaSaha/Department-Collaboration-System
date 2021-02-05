import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassroomService } from '../classroom.service';
import { CourseService } from '../course.service';
import { CourseResponseBody } from '../models/course.model';
import { SessionResponseBody } from '../models/session.model';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-classroom-edit',
  templateUrl: './classroom-edit.component.html',
  styleUrls: ['./classroom-edit.component.css'],
})
export class ClassroomEditComponent implements OnInit {
  classroomForm: FormGroup;
  sessions$: Observable<SessionResponseBody>;
  courses$: Observable<CourseResponseBody>;
  isLoading: boolean = false;

  constructor(
    private sessionService: SessionService,
    private classroomService: ClassroomService,
    private courseService: CourseService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.sessions$ = this.sessionService.getSessions();
    this.courses$ = this.courseService.getCourses();
  }

  private formInit() {
    let session = '';
    let course = '';
    let extra_students_id = new FormArray([]);

    this.classroomForm = new FormGroup({
      sessionId: new FormControl(session, [Validators.required]),
      courseId: new FormControl(course, [Validators.required]),
      extra_students_id: extra_students_id,
    });
  }

  onAddExtraStudent() {
    (<FormArray>this.classroomForm.get('extra_students_id')).push(
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

  onDeleteExtraStudent(index: number) {
    (<FormArray>this.classroomForm.get('extra_students_id')).removeAt(+index);
  }

  onSubmit() {
    console.log(this.classroomForm.value);
    this.isLoading = true;
    this.classroomService.createClassroom(this.classroomForm.value).subscribe(
      res => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['teacher', 'classroom', res.data.classroom.id]);
      },
      err => {
        console.log(err);
        this.isLoading = false;
      },
    );
  }
}

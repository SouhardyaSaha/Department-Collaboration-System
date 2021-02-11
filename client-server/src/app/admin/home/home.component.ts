import { Component, OnInit } from '@angular/core';
import { SessionModel } from '../add-sessions/sessions.model';
import { SessionService } from '../add-sessions/sessions.service';
import { StudentService } from '../add-student/student.service';
import { TeacherService } from '../add-teacher/teacher.service';
import { CourseService } from '../courses/course.service';
import { Subscription } from 'rxjs';
import { CourseModel } from '../courses/course.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user;
  sessions;
  courses;
  teachers;
  students;
  private sessionSub: Subscription;
  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private courseService: CourseService,
    private teacherService: TeacherService,
    private studentService: StudentService,
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.user = user;
    });
    this.sessionService.getSessionData();
    this.sessionSub = this.sessionService
      .getSessionUpdate()
      .subscribe((sessions: SessionModel[]) => {
        // console.log(sessions.length);
        this.sessions = sessions.length;
      });
    this.courseService.getCourseData();
    this.sessionSub = this.courseService
      .getCourseUpdate()
      .subscribe((courses: CourseModel[]) => {
        // console.log(courses.length);
        this.courses = courses.length;
      });
    this.teacherService.getTeachers().subscribe(res => {
      // console.log(res.data.teachers.length);
      this.teachers = res.data.teachers.length;
    });
    this.studentService.getStudents().subscribe(res => {
      // console.log(res.data.students.length);
      this.students = res.data.students.length;
    });
    // console.log(this.sessions);
  }
  ngOnDestroy(): void {
    this.sessionSub.unsubscribe();
  }
}

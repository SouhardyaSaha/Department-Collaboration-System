import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { NgxFileDropModule } from 'ngx-file-drop';
// import { AddCoursesComponent } from './add-courses/add-courses.component';
import { AddSessionsComponent } from './add-sessions/add-sessions.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentListComponent } from './add-student/student-list/student-list.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { TeacherListComponent } from './add-teacher/teacher-list/teacher-list.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';
// import { CoursesComponent } from './add-courses/courses.component';
import { CoursesComponent } from './courses/courses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { IndividualCourseComponent } from './courses/individual-course/individual-course.component';
import { NewSessionComponent } from './add-sessions/new-session/new-session.component';
import { EditCourseComponent } from './courses/edit-course/edit-course.component';

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    AddTeacherComponent,
    AddStudentComponent,
    TeacherListComponent,
    StudentListComponent,
    AddUsersComponent,
    AddSessionsComponent,
    // AddCoursesComponent,
    AddCourseComponent,
    CoursesComponent,
    CourseListComponent,
    IndividualCourseComponent,
    NewSessionComponent,
    EditCourseComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxFileDropModule,
  ],
})
export class AdminModule {}

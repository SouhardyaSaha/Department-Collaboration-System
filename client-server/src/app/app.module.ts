import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from './auth/auth-intercerptor.service';
import { ErrorInterceptor } from './error.interceptor';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';
import { RoutineGeneratorComponent } from './routine-generator/routine-generator.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { RoutineListComponent } from './routine-generator/routine-list/routine-list.component';
import { ExportAsModule } from 'ngx-export-as';
import { RoutineEditComponent } from './routine-generator/routine-edit/routine-edit.component';
import { ChatComponent } from './chat/chat.component';
import { AttendanceTakerComponent } from './attendance-taker/attendance-taker.component';
import { AttendanceFormComponent } from './attendance-taker/attendance-form/attendance-form.component';
import { AttendanceListComponent } from './attendance-taker/attendance-list/attendance-list.component';
import { AllAttendanceComponent } from './attendance-taker/all-attendance/all-attendance.component';
import { IndividualAttendanceComponent } from './attendance-taker/individual-attendance/individual-attendance.component';
import { AddTeacherComponent } from './admin/add-teacher/add-teacher.component';
import { AddStudentComponent } from './admin/add-student/add-student.component';
import { TeacherListComponent } from './admin/add-teacher/teacher-list/teacher-list.component';
import { StudentListComponent } from './admin/add-student/student-list/student-list.component';
import { AddUsersComponent } from './admin/add-users/add-users.component';
import { AddSessionsComponent } from './admin/add-sessions/add-sessions.component';
import { AddCoursesComponent } from './admin/add-courses/add-courses.component';
@NgModule({
  declarations: [
    AppComponent,
    RoutineGeneratorComponent,
    RoutineListComponent,
    RoutineEditComponent,
    ChatComponent,
    AttendanceTakerComponent,
    AttendanceFormComponent,
    AttendanceListComponent,
    AllAttendanceComponent,
    IndividualAttendanceComponent,
    AddTeacherComponent,
    AddStudentComponent,
    TeacherListComponent,
    StudentListComponent,
    AddUsersComponent,
    AddSessionsComponent,
    AddCoursesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ExportAsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  entryComponents: [RoutineEditComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

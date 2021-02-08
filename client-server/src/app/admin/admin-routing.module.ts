import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { AddSessionsComponent } from './add-sessions/add-sessions.component';
import { AddCoursesComponent } from './add-courses/add-courses.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/admin/home',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'teacher',
        component: AddTeacherComponent,
      },
      {
        path: 'student',
        component: AddStudentComponent,
      },
      {
        path: 'add',
        component: AddUsersComponent,
      },
      {
        path: 'sessions',
        component: AddSessionsComponent,
      },
      {
        path: 'courses',
        component: AddCoursesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

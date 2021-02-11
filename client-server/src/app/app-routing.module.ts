import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
// import { AttendanceTakerComponent } from './attendance-taker/attendance-taker.component';
import { RoutineGeneratorComponent } from './routine-generator/routine-generator.component';
import { RoutineListComponent } from './routine-generator/routine-list/routine-list.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.module').then(m => m.StudentModule),
  },
  {
    path: 'teacher',
    loadChildren: () =>
      import('./teacher/teacher.module').then(m => m.TeacherModule),
  },
  // { path: 'attendance', component: AttendanceTakerComponent },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
  // {
  //   path: 'routine',
  //   component: RoutineGeneratorComponent,
  //   children: [{ path: 'list', component: RoutineListComponent }],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth',
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
  {
    path: 'chat',
    component: ChatComponent,
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

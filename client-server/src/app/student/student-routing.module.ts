import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student.component';
// import { ClassroomShowComponent } from './classroom-show/classroom-show.component';
import { ClassRoutineComponent } from './class-routine/class-routine.component';
import { StudentGuard } from './student.guard';
import { ClassroomComponent } from '../shared/classroom/classroom.component';
import { ClassroomShowComponent } from '../shared/classroom-show/classroom-show.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    canActivate: [StudentGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/student/home',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'classroom',
        component: ClassroomComponent,
      },
      {
        path: 'classroom/:id',
        component: ClassroomShowComponent,
      },
      {
        path: 'routine',
        pathMatch: 'full',
        component: ClassRoutineComponent,
      },
      {
        path: '**',
        redirectTo: '/auth/login',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}

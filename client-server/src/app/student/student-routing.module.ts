import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student.component';
// import { ClassroomShowComponent } from './classroom-show/classroom-show.component';
import { ClassRoutineComponent } from './class-routine/class-routine.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
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
      // {
      //   path: 'classroom',
      //   pathMatch: 'full',
      //   component: ClassroomShowComponent,
      // },
      {
        path: 'routine',
        pathMatch: 'full',
        component: ClassRoutineComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}

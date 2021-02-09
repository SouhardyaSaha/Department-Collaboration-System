import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutineGeneratorComponent } from '../routine-generator/routine-generator.component';
import { RoutineListComponent } from '../routine-generator/routine-list/routine-list.component';
import { ClassroomShowComponent } from '../shared/classroom-show/classroom-show.component';
import { ClassroomComponent } from '../shared/classroom/classroom.component';
import { HomeComponent } from './home/home.component';
import { TeacherComponent } from './teacher.component';
import { TeacherGuard } from './teacher.guard';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    canActivate: [TeacherGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/teacher/home',
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
        component: RoutineGeneratorComponent,
        children: [{ path: 'list', component: RoutineListComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}

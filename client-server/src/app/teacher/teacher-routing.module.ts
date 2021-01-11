import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutineGeneratorComponent } from '../routine-generator/routine-generator.component';
import { RoutineListComponent } from '../routine-generator/routine-list/routine-list.component';
import { ClassroomShowComponent } from './classroom-show/classroom-show.component';
import { ClassroomEditComponent } from './classroom/classroom-edit/classroom-edit.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { HomeComponent } from './home/home.component';
import { TeacherComponent } from './teacher.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/teacher/home'
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { ClassroomComponent } from './classroom/classroom.component';
import { ClassroomEditComponent } from './classroom/classroom-edit/classroom-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassroomTileComponent } from './classroom/classroom-tile/classroom-tile.component';
import { ClassroomShowComponent } from './classroom-show/classroom-show.component';
import { ClassroomStudentsComponent } from './classroom-show/classroom-students/classroom-students.component';

@NgModule({
  declarations: [
    TeacherComponent,
    HomeComponent,
    ClassroomComponent,
    ClassroomEditComponent,
    ClassroomTileComponent,
    ClassroomShowComponent,
    ClassroomStudentsComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class TeacherModule {}

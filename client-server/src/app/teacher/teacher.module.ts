import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherComponent } from './teacher.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { ClassListComponent } from './home/class-list/class-list.component';
import { SharedModule } from '../shared/shared.module';
import { AddRoutineComponent } from './add-routine/add-routine.component';
import { RoutineFormComponent } from './add-routine/routine-form/routine-form.component';
import { RoutinePreviewComponent } from './add-routine/routine-preview/routine-preview.component';
@NgModule({
  declarations: [TeacherComponent, HomeComponent, ClassListComponent, AddRoutineComponent, RoutineFormComponent, RoutinePreviewComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    SharedModule,
  ],
})
export class TeacherModule {}

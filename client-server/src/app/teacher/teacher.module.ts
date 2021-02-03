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
import { ClassroomGeneralComponent } from './classroom-show/classroom-general/classroom-general.component';
import { ClassroomPostComponent } from './classroom-show/classroom-general/classroom-post/classroom-post.component';
import { ClassroomPostEditComponent } from './classroom-show/classroom-general/classroom-post-edit/classroom-post-edit.component';
import { ClassroomPostCommentComponent } from './classroom-show/classroom-general/classroom-post/classroom-post-comment/classroom-post-comment.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ClassroomClassworkComponent } from './classroom-show/classroom-classwork/classroom-classwork.component';
import { ClassroomClassworkTileComponent } from './classroom-show/classroom-classwork/classroom-classwork-tile/classroom-classwork-tile.component';
import { ClassworkEditComponent } from './classroom-show/classroom-classwork/classwork-edit/classwork-edit.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { ClassroomClassworkDetailsComponent } from './classroom-show/classroom-classwork/classroom-classwork-details/classroom-classwork-details.component';

@NgModule({
  declarations: [
    TeacherComponent,
    HomeComponent,
    ClassroomComponent,
    ClassroomEditComponent,
    ClassroomTileComponent,
    ClassroomShowComponent,
    ClassroomStudentsComponent,
    ClassroomGeneralComponent,
    ClassroomPostComponent,
    ClassroomPostEditComponent,
    ClassroomPostCommentComponent,
    ClassroomClassworkComponent,
    ClassroomClassworkTileComponent,
    ClassworkEditComponent,
    ClassroomClassworkDetailsComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
  ],
})
export class TeacherModule {}

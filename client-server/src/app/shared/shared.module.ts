import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AttendanceFormComponent } from ';'
import { ClassroomClassworkDetailsComponent } from './classroom-show/classroom-classwork/classroom-classwork-details/classroom-classwork-details.component';
import { ClassroomClassworkTileComponent } from './classroom-show/classroom-classwork/classroom-classwork-tile/classroom-classwork-tile.component';
import { ClassroomClassworkComponent } from './classroom-show/classroom-classwork/classroom-classwork.component';
import { ClassworkEditComponent } from './classroom-show/classroom-classwork/classwork-edit/classwork-edit.component';
import { ClassroomGeneralComponent } from './classroom-show/classroom-general/classroom-general.component';
import { ClassroomPostEditComponent } from './classroom-show/classroom-general/classroom-post-edit/classroom-post-edit.component';
import { ClassroomPostCommentComponent } from './classroom-show/classroom-general/classroom-post/classroom-post-comment/classroom-post-comment.component';
import { ClassroomPostComponent } from './classroom-show/classroom-general/classroom-post/classroom-post.component';
import { ClassroomShowComponent } from './classroom-show/classroom-show.component';
import { ClassroomStudentsComponent } from './classroom-show/classroom-students/classroom-students.component';
import { IndividualStudentComponent } from './classroom-show/classroom-students/individual-student/individual-student.component';
import { ClassroomEditComponent } from './classroom/classroom-edit/classroom-edit.component';
import { ClassroomTileComponent } from './classroom/classroom-tile/classroom-tile.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { MaterialModule } from '../material.module';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { RouterModule } from '@angular/router';
import { AttendanceFormComponent } from './classroom-show/classroom-students/attendance-form/attendance-form.component';
import { ClassworkSubmissionsComponent } from './classroom-show/classroom-classwork/classwork-submissions/classwork-submissions.component';

@NgModule({
  declarations: [
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
    IndividualStudentComponent,
    AttendanceFormComponent,
    ClassworkSubmissionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
  ],
  exports: [
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
    IndividualStudentComponent,
    // AttendanceFormComponent,
  ],
})
export class SharedModule {}

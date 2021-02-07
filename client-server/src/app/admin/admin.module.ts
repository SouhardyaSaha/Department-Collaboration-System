import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { AddCourseComponent } from './courses/add-course/add-course.component';
// import { CoursesComponent } from './add-courses/courses.component';
import { CoursesComponent } from './courses/courses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { IndividualCourseComponent } from './courses/individual-course/individual-course.component';

@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    AddCourseComponent,
    CoursesComponent,
    CourseListComponent,
    IndividualCourseComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}

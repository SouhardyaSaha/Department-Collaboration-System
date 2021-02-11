import { Injectable } from '@angular/core';
import { CourseModel } from './course.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private CourseData: CourseModel[] = [];
  private updateCourse = new Subject<CourseModel[]>();
  constructor(private http: HttpClient) {}

  getCourseData() {
    this.http
      .get<{ status: string; data }>('http://localhost:3000/courses')
      .subscribe(response => {
        // console.log(response.data.courses);
        // this.CourseData = response.data.courses;
        this.CourseData = response.data.courses.map(o => {
          return {
            id: o.id,
            admin_id: o.adminId,
            course_title: o.title,
            credit: o.credit,
            session: o.semester,
            details: o.details,
            optional: o.is_optional,
          };
        });
        // console.log(this.CourseData);
        this.updateCourse.next([...this.CourseData]);
      });
  }
  getCourseUpdate() {
    return this.updateCourse.asObservable();
  }
  postCourseData(data: CourseModel) {
    const postData: CourseModel = data;
    console.log('From Service', postData);
    this.http
      .post<{ message: string; id: number }>(
        'http://localhost:3000/courses',
        postData,
      )
      .subscribe(responseData => {
        console.log(responseData.message, responseData.id);

        postData.id = responseData.id;
        this.CourseData.push(postData);
        console.log('Add Course: ', this.CourseData);
        this.updateCourse.next([...this.CourseData]);
      });
  }
  updateCourseData(id, postData: CourseModel) {
    this.http
      .patch<{ status: string; data: { course } }>(
        'http://localhost:3000/courses/' + id,
        postData,
      )
      .subscribe(response => {
        const UpdatedList = this.CourseData.map(routine => {
          if (routine.id !== id) {
            return routine;
          } else {
            const o = response.data.course;
            return {
              id: o.id,
              admin_id: o.adminId,
              course_title: o.title,
              credit: o.credit,
              session: o.semester,
              details: o.details,
              optional: o.is_optional,
            };
          }
        });
        this.CourseData = UpdatedList;

        this.updateCourse.next([...this.CourseData]);
      });
  }
  deleteCourseData(id) {
    this.http
      .delete('http://localhost:3000/courses/' + id)
      .subscribe(responseData => {
        console.log(responseData);
        const UpdatedList = this.CourseData.filter(
          routine => routine.id !== id,
        );
        this.CourseData = UpdatedList;
        this.updateCourse.next([...this.CourseData]);
      });
  }
}

import { Injectable } from '@angular/core';
import { CourseModel } from './course.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private CourseData: CourseModel[] = [];
  private updateCourse = new Subject<CourseModel[]>();
  constructor(private http: HttpClient) {}

  getCourseData() {}
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
        postData.admin_id = responseData.id;
        this.CourseData.push(postData);
        // console.log("Add Post: ",this.routineData);
        this.updateCourse.next([...this.CourseData]);
      });
  }
  updateCourseData(id, data: CourseModel) {}
}

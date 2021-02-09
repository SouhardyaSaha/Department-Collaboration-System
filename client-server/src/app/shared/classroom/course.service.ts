import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CourseResponseBody } from './models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}
  baseURL: string = environment.serverURL;

  getCourses() {
    return this.http.get<CourseResponseBody>(`${this.baseURL}/courses`);
  }
}

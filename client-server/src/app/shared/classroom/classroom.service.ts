import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  ClassroomCreateResponseBody,
  ClassroomPostBody,
  MultipleClassroomResponseBody,
  SingleClassroomResponseBody,
} from './models/classroom.model';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  baseURL: string = environment.serverURL;
  constructor(private http: HttpClient) {}

  createClassroom(classroom: ClassroomPostBody) {
    return this.http.post<ClassroomCreateResponseBody>(
      `${this.baseURL}/classrooms`,
      classroom,
    );
  }

  getClassrooms() {
    return this.http.get<MultipleClassroomResponseBody>(
      `${this.baseURL}/classrooms`,
    );
  }

  getClassroomById(id: number) {
    return this.http
      .get<SingleClassroomResponseBody>(`${this.baseURL}/classrooms/${id}`)
      .pipe(tap(res => console.log(res)));
  }

  // getStudents() {
  //   return this.http.get(`${this.baseURL}/users/students`);
  // }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AllTeacherResponseBody } from '../../shared/classroom/models/classroom.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  baseURL: string = environment.serverURL;
  constructor(private http: HttpClient) {}

  getTeachers() {
    return this.http
      .get<AllTeacherResponseBody>(`${this.baseURL}/users/teachers`)
      .pipe(tap(res => console.log(res)));
  }

  // getClassroomById(id: number) {
  //   return this.http
  //     .get<SingleClassroomResponseBody>(`${this.baseURL}/classrooms/${id}`)
  //     .pipe(tap(res => console.log(res)));
  // }

  // getStudents() {
  //   return this.http.get(`${this.baseURL}/users/students`);
  // }
}

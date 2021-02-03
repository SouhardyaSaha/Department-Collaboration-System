import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  ClassroomCreateResponseBody,
  ClassroomPostBody,
  MultipleClassroomResponseBody,
} from './models/classroom.model';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  baseURL: string = environment.serverURL;
  constructor(private http: HttpClient, private router: Router) {}

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

  // getStudents() {
  //   return this.http.get(`${this.baseURL}/users/students`);
  // }
}

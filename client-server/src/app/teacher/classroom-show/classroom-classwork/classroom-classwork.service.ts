import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ClassworkResponseBody,
  ClassworkSubmitBody,
} from '../../classroom/models/classwork.model';

@Injectable({
  providedIn: 'root',
})
export class ClassroomClassworkService {
  constructor(private http: HttpClient) {}
  baseURL: string = environment.serverURL;

  addClasswork(classroomId: number, classwork: ClassworkSubmitBody) {
    let url: string = `${this.baseURL}/classrooms/${classroomId}/classworks`;
    return this.http.post<ClassworkResponseBody>(url, classwork);
  }
}

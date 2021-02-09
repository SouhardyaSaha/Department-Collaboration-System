import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ClassworkResponseBody,
  ClassworkSubmissionBody,
  ClassworkSubmissionResponseBody,
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

  submitClasswork(
    classroomId: number,
    classworkId: number,
    submissionBody: ClassworkSubmissionBody,
  ) {
    let url: string = `${this.baseURL}/classrooms/${classroomId}/classworks/${classworkId}/submission`;
    const submitData: FormData = new FormData();
    submissionBody.files.forEach(file => {
      submitData.append('files', file);
    });
    return this.http.post<ClassworkSubmissionResponseBody>(url, submitData);
  }

  getClassworkSubmissions(classroomId: number, classworkId: number) {
    let url: string = `${this.baseURL}/classrooms/${classroomId}/classworks/${classworkId}/submission`;
    return this.http.get<ClassworkSubmissionResponseBody>(url);
  }
}

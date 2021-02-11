import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private baseURL = environment.serverURL;

  constructor(private http: HttpClient) {}

  createAttendance(classroomId: number, absent_student_ids: number[]) {
    let url = `${this.baseURL}/classrooms/${classroomId}/attendances`;
    return this.http.post(url, { absent_student_ids });
  }

  getStudentAttendances(classroomId: number, studentId: number) {
    let url = `${this.baseURL}/classrooms/${classroomId}/attendances/students/${studentId}`;
    return this.http.get(url);
  }

  getLecturesWithAttendances(classroomId: number) {
    let url = `${this.baseURL}/classrooms/${classroomId}/attendances/lectures`;
    return this.http.get(url);
  }
}

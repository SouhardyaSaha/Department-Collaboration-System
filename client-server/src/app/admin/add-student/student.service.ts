import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AllStudentResponseBody } from '../../shared/classroom/models/classroom.model';
// import { studentModel } from './student.model';
import { Subject } from 'rxjs';
import { Student } from '../../shared/classroom/models/classroom.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseURL: string = environment.serverURL;
  private studentData: Student[] = [];
  private updateStudentList = new Subject<Student[]>();
  constructor(private http: HttpClient) {}

  getStudents() {
    return this.http
      .get<AllStudentResponseBody>(`${this.baseURL}/users/students`)
      .pipe(
        tap(res => {
          console.log('Student service', res);
          this.studentData = res.data.students;
          this.updateStudentList.next([...this.studentData]);
        }),
      );
  }

  getstudentUpdate() {
    return this.updateStudentList.asObservable();
  }
  deleteUserById(id: number) {
    return this.http
      .delete<{ status: string }>(`${this.baseURL}/users/${id}`)
      .pipe(
        tap(res => {
          if (res.status == 'success') {
            const UpdatedList = this.studentData.filter(
              routine => routine.user.id !== id,
            );
            this.studentData = UpdatedList;
            this.updateStudentList.next([...this.studentData]);
          }
        }),
      );
  }

  // getStudents() {
  //   return this.http.get(`${this.baseURL}/users/students`);
  // }
}

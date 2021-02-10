import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AllTeacherResponseBody } from '../../shared/classroom/models/classroom.model';
// import { TeacherModel } from './teacher.model';
import { Subject } from 'rxjs';
import { Teacher } from './teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  baseURL: string = environment.serverURL;
  private teacherData: Teacher[] = [];
  private updateTeacherList = new Subject<Teacher[]>();
  constructor(private http: HttpClient) {}

  getTeachers() {
    return this.http
      .get<AllTeacherResponseBody>(`${this.baseURL}/users/teachers`)
      .pipe(
        tap(res => {
          // console.log('service', res);
          this.teacherData = res.data.teachers;
          this.updateTeacherList.next([...this.teacherData]);
        }),
      );
  }

  getTeacherUpdate() {
    return this.updateTeacherList.asObservable();
  }
  deleteUserById(id: number) {
    return this.http
      .delete<{ status: string }>(`${this.baseURL}/users/${id}`)
      .pipe(
        tap(res => {
          if (res.status == 'success') {
            const UpdatedList = this.teacherData.filter(
              routine => routine.user.id !== id,
            );
            this.teacherData = UpdatedList;
            this.updateTeacherList.next([...this.teacherData]);
          }
        }),
      );
  }

  // getStudents() {
  //   return this.http.get(`${this.baseURL}/users/students`);
  // }
}

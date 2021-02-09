import { Injectable } from '@angular/core';
import { AttendanceData } from './attendance.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private allAttendanceData: AttendanceData[] = [];
  private updateAttendance = new Subject<AttendanceData[]>();

  constructor(private http: HttpClient) {}

  getAttendanceData() {
    this.http
      .get<{ msg: string; attendance }>('http://localhost:3000/attendance')
      .subscribe(data => {
        console.log(data);
        // this.allAttendanceData = data.attendance;
        // console.log(data.attendance);
        // this.updateAttendance.next([...this.allAttendanceData]);
      });
  }

  getAttendanceUpdate() {
    return this.updateAttendance.asObservable();
  }

  addAttendanceData(attendanceData: AttendanceData) {
    const postAttendance: AttendanceData = attendanceData;
    const class_id = attendanceData.class_id;
    const date = attendanceData.date;
    // console.log("view "+postRoutine.courseTitle);
    for (let student_id of attendanceData.student_id) {
      this.http
        .post<{ message: string; id: number }>(
          'http://localhost:3000/attendance',
          { student_id, class_id, date },
        )
        .subscribe(responseData => {
          console.log(responseData.message, responseData.id);
          postAttendance.id = responseData.id;
          this.allAttendanceData.push(postAttendance);
          // console.log("Add Post: ",this.routineData);
          this.updateAttendance.next([...this.allAttendanceData]);
        });
    }
  }
}

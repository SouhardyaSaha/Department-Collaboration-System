import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AttendanceService } from '../attendance.service';

@Component({
  selector: 'app-individual-student',
  templateUrl: './individual-student.component.html',
  styleUrls: ['./individual-student.component.css'],
})
export class IndividualStudentComponent implements OnInit {
  studentId;
  classroomId;
  isLoading: boolean = false;
  attendance_details$: Observable<any>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private attendanceService: AttendanceService,
  ) {}

  ngOnInit(): void {
    this.studentId = this.data.studentId;
    this.classroomId = this.data.classroomId;
    this.attendance_details$ = this.attendanceService.getStudentAttendances(
      this.classroomId,
      this.studentId,
    );
  }

  getAttendancePercentage(total_lectures, absent_count) {
    const count =
      100 -
      Math.round((100 * parseInt(absent_count)) / parseInt(total_lectures));
    return count;
  }
}

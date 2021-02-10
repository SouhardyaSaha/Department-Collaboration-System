import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ClassroomService } from '../classroom/classroom.service';
import {
  Classroom,
  SingleClassroomResponseBody,
} from '../classroom/models/classroom.model';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-classroom-show',
  templateUrl: './classroom-show.component.html',
  styleUrls: ['./classroom-show.component.css'],
})
export class ClassroomShowComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup;
  classroom$: Observable<SingleClassroomResponseBody>;
  id: number;
  isTeacher: boolean = false;
  private activatedRouteSnapshot: ActivatedRouteSnapshot;
  // asyncTabs: Observable<ExampleTab[]>;

  constructor(
    private classroomService: ClassroomService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    this.activatedRouteSnapshot = route.snapshot;
  }

  ngOnInit(): void {
    this.id = this.activatedRouteSnapshot.params['id'];
    this.authService.user.subscribe(user => {
      if (user) {
        this.isTeacher = user.isTeacher;
      }
    });

    this.classroom$ = this.classroomService.getClassroomById(this.id);
    // console.log(classroom);
  }
}

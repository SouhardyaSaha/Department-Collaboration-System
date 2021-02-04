import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, Observer } from 'rxjs';
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
  private activatedRouteSnapshot: ActivatedRouteSnapshot;
  // asyncTabs: Observable<ExampleTab[]>;

  constructor(
    private classroomService: ClassroomService,
    private route: ActivatedRoute,
  ) {
    this.activatedRouteSnapshot = route.snapshot;
    // this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
    //   setTimeout(() => {
    //     observer.next([
    //       { label: 'General', content: 'Content 1' },
    //       { label: 'Class', content: 'Content 2' },
    //       // { label: 'Third', content: 'Content 3' },
    //     ]);
    //   }, 0);
    // });
  }

  ngOnInit(): void {
    this.id = this.activatedRouteSnapshot.params['id'];
    // console.log(this.activatedRouteSnapshot);

    this.classroom$ = this.classroomService.getClassroomById(this.id);
    // console.log(classroom);
  }
}

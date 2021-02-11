import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionResponseBody } from 'src/app/shared/classroom/models/session.model';
import { SessionService } from 'src/app/shared/classroom/session.service';

@Component({
  selector: 'app-class-routine',
  templateUrl: './class-routine.component.html',
  styleUrls: ['./class-routine.component.css'],
})
export class ClassRoutineComponent implements OnInit {
  semester = '1/2';
  session$: Observable<any>;

  constructor(private sessionService: SessionService) {
    this.session$ = this.sessionService.getStudentSession();
  }

  ngOnInit(): void {
    this.session$ = this.sessionService.getStudentSession();
  }
}

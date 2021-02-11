import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionResponseBody } from '../../shared/classroom/models/session.model';
import { SessionService } from '../../shared/classroom/session.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RoutinePreviewComponent } from './routine-preview/routine-preview.component';
import { RoutineFormComponent } from './routine-form/routine-form.component';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-routine',
  templateUrl: './add-routine.component.html',
  styleUrls: ['./add-routine.component.css'],
})
export class AddRoutineComponent implements OnInit {
  sessions$: Observable<SessionResponseBody>;

  constructor(
    private sessionService: SessionService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.sessions$ = this.sessionService.getSessions();
    console.log('add-routine', this.sessions$);
  }

  openDialog() {}

  getDetails(session) {
    console.log('Add-Routine pop', session);
    const dialogConfig = new MatDialogConfig();
    // let id = this.routines[index].id;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '60%';
    dialogConfig.height = '70%';
    dialogConfig.data = { session: session };
    this.dialog.open(RoutinePreviewComponent, dialogConfig);
  }

  addRoutine(id) {
    const dialogConfig = new MatDialogConfig();
    // let id = this.routines[index].id;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { sessionId: id };
    this.dialog.open(RoutineFormComponent, dialogConfig);
  }

  deleteById(id) {}

  onUpload() {
    console.log('hit');
  }
}

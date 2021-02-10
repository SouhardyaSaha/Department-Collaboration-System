import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Session } from '../../../shared/classroom/models/session.model';

@Component({
  selector: 'app-routine-preview',
  templateUrl: './routine-preview.component.html',
  styleUrls: ['./routine-preview.component.css'],
})
export class RoutinePreviewComponent implements OnInit {
  // session: Session;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<Session>,
  ) {}

  ngOnInit(): void {
    // console.log(this.data.session);
    // this.session = this.data.se;
  }
}

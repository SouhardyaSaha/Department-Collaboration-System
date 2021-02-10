import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  Classwork,
  Submission,
} from 'src/app/shared/classroom/models/classwork.model';
import { ClassroomClassworkDetailsComponent } from '../classroom-classwork-details/classroom-classwork-details.component';
import {} from '../classroom-classwork.component';
import { ClassworkSubmissionsComponent } from '../classwork-submissions/classwork-submissions.component';

@Component({
  selector: 'app-classroom-classwork-tile',
  templateUrl: './classroom-classwork-tile.component.html',
  styleUrls: ['./classroom-classwork-tile.component.css'],
})
export class ClassroomClassworkTileComponent implements OnInit {
  @Input() classwork: Classwork;
  isAssignment: boolean;
  classworkSubmissionDialogConfig: MatDialogConfig;
  constructor(
    public classworkDetailsDialog: MatDialog,
    public classworkEditDialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.isAssignment = this.classwork.task_type === 'assignment';
  }

  onClassworkDetailsDialogOpen() {
    const dialogConfig: MatDialogConfig = {
      maxWidth: '90%',
      width: '700px',
      disableClose: true,
      data: {
        classwork: this.classwork,
      },
    };

    const dialogRef = this.classworkDetailsDialog.open(
      ClassroomClassworkDetailsComponent,
      dialogConfig,
    );

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openClassworkSubmissionDialog() {
    const dialogConfig: MatDialogConfig = {
      maxWidth: '90%',
      width: '700px',
      disableClose: true,
      data: {
        submissions: this.classwork.submissions,
      },
    };

    const dialogRef = this.classworkEditDialog.open(
      ClassworkSubmissionsComponent,
      dialogConfig,
    );

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }
}

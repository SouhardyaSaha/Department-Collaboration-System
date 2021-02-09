import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Classwork } from 'src/app/shared/classroom/models/classwork.model';
import { ClassroomClassworkDetailsComponent } from '../classroom-classwork-details/classroom-classwork-details.component';
import {} from '../classroom-classwork.component';

@Component({
  selector: 'app-classroom-classwork-tile',
  templateUrl: './classroom-classwork-tile.component.html',
  styleUrls: ['./classroom-classwork-tile.component.css'],
})
export class ClassroomClassworkTileComponent implements OnInit {
  constructor(public classworkDetailsDialog: MatDialog) {}
  @Input() classwork: Classwork;
  isAssignment: boolean;
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
}

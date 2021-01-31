import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClassroomPostEditComponent } from './classroom-post-edit/classroom-post-edit.component';

@Component({
  selector: 'app-classroom-general',
  templateUrl: './classroom-general.component.html',
  styleUrls: ['./classroom-general.component.css'],
})
export class ClassroomGeneralComponent implements OnInit {
  constructor(public postCreateDialog: MatDialog) {}

  ngOnInit() {}

  openPostDialog() {
    const dialogConfig: MatDialogConfig = {
      maxWidth: '90%',
      width: '700px',
    };

    const dialogRef = this.postCreateDialog.open(
      ClassroomPostEditComponent,
      dialogConfig,
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
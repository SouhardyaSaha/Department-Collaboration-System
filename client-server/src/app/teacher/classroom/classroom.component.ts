import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClassroomEditComponent } from './classroom-edit/classroom-edit.component';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css'],
})
export class ClassroomComponent implements OnInit {
  constructor(public classroomCreateDialog: MatDialog) {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.minHeight = 800
    dialogConfig.minWidth = 350;
    const dialogRef = this.classroomCreateDialog.open(
      ClassroomEditComponent,
      dialogConfig,
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClassworkEditComponent } from './classwork-edit/classwork-edit.component';

@Component({
  selector: 'app-classroom-classwork',
  templateUrl: './classroom-classwork.component.html',
  styleUrls: ['./classroom-classwork.component.css'],
})
export class ClassroomClassworkComponent implements OnInit {
  constructor(public classworkEditDialog: MatDialog) {}

  ngOnInit(): void {}

  openClassworkEditDialog() {
    const dialogConfig: MatDialogConfig = {
      maxWidth: '90%',
      width: '700px',
      disableClose: true,
    };

    const dialogRef = this.classworkEditDialog.open(
      ClassworkEditComponent,
      dialogConfig,
    );

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }
}

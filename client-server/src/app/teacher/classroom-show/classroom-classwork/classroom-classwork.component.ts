import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Classwork } from '../../classroom/models/classwork.model';
import { ClassworkEditComponent } from './classwork-edit/classwork-edit.component';

@Component({
  selector: 'app-classroom-classwork',
  templateUrl: './classroom-classwork.component.html',
  styleUrls: ['./classroom-classwork.component.css'],
})
export class ClassroomClassworkComponent implements OnInit {
  @Input() classworks: Classwork;
  constructor(
    public classworkEditDialog: MatDialog,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}

  openClassworkEditDialog() {
    const dialogConfig: MatDialogConfig = {
      maxWidth: '90%',
      width: '700px',
      disableClose: true,
      data: {
        classroomId: this.route.snapshot.params['id'],
      },
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

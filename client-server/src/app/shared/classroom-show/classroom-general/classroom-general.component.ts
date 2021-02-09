import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Post } from '../../classroom/models/post.model';
import { ClassroomPostEditComponent } from './classroom-post-edit/classroom-post-edit.component';

@Component({
  selector: 'app-classroom-general',
  templateUrl: './classroom-general.component.html',
  styleUrls: ['./classroom-general.component.css'],
})
export class ClassroomGeneralComponent implements OnInit {
  constructor(
    public postCreateDialog: MatDialog,
    private activateRoute: ActivatedRoute,
  ) {}
  @Input() posts: Post[];
  ngOnInit() {
    console.log(this.posts, 'ok');
  }

  openPostDialog() {
    const dialogConfig: MatDialogConfig = {
      maxWidth: '90%',
      width: '700px',
      disableClose: true,
      data: {
        classroomId: this.activateRoute.snapshot.params['id'],
      },
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

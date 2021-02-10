import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ClassroomEditComponent } from './classroom-edit/classroom-edit.component';
import { ClassroomService } from './classroom.service';
import { MultipleClassroomResponseBody } from './models/classroom.model';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css'],
})
export class ClassroomComponent implements OnInit {
  classrooms$: Observable<MultipleClassroomResponseBody>;
  isTeacher: boolean = false;
  constructor(
    private classroomCreateDialog: MatDialog,
    private classroomService: ClassroomService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.classrooms$ = this.classroomService.getClassrooms();
    this.authService.user.subscribe(user => {
      if (user) {
        this.isTeacher = user.isTeacher;
      }
    });
  }

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
}

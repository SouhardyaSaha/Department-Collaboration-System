import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';
import { AuthService } from 'src/app/auth/auth.service';
import { Classwork } from 'src/app/shared/classroom/models/classwork.model';
import { popupNotification } from 'src/app/shared/utils.class';
import Swal from 'sweetalert2';
import { ClassroomClassworkService } from '../classroom-classwork.service';

@Component({
  selector: 'app-classroom-classwork-details',
  templateUrl: './classroom-classwork-details.component.html',
  styleUrls: ['./classroom-classwork-details.component.css'],
})
export class ClassroomClassworkDetailsComponent implements OnInit {
  classwork: Classwork;
  submissionForm: FormGroup;
  isStudent: boolean = true;
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private classworkService: ClassroomClassworkService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.classwork = this.data.classwork;
    // console.log(this.classwork);
    this.authService.user.subscribe(user => {
      if (user) {
        this.isStudent = user.isStudent;
      }
    });
    this.submissionForm = new FormGroup({
      files: new FormArray([], Validators.required),
    });
  }

  public dropped(files: NgxFileDropEntry[]) {
    console.log('oks');

    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file.size > 6291456) {
            this.popNotification(
              'Error',
              `${file.name} is greater than 6 mb`,
              'error',
            );
            return;
          }
          (<FormArray>this.submissionForm.get('files')).push(
            new FormControl(file),
          );
          // Here you can access the real file
          // console.log(droppedFile.relativePath, file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
      console.log(this.submissionForm.value);
    }
  }

  public fileOver() {
    // console.log(event);
  }

  public fileLeave() {
    // console.log(event);
  }

  public removeFile(index) {
    (<FormArray>this.submissionForm.get('files')).removeAt(+index);
  }

  popNotification(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }

  onSubmission() {
    const { classroomId, id } = this.classwork;
    console.log('ok');

    this.classworkService
      .submitClasswork(classroomId, id, this.submissionForm.value)
      .subscribe(
        res => {
          console.log(res);
          // location.reload();
          popupNotification('Success', 'success', 'success');
        },
        err => {
          console.log(err);
          popupNotification('Error', 'error', 'error');
        },
      );
  }
}

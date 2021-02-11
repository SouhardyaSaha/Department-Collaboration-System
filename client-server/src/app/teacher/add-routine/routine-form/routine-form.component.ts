import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from 'ngx-file-drop';
import { SessionService } from 'src/app/shared/classroom/session.service';
import { popupNotification } from 'src/app/shared/utils.class';

@Component({
  selector: 'app-routine-form',
  templateUrl: './routine-form.component.html',
  styleUrls: ['./routine-form.component.css'],
})
export class RoutineFormComponent implements OnInit {
  routineImage: FormControl;
  sessionId;
  constructor(
    private sessionService: SessionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.routineImage = new FormControl(null, Validators.required);
    this.sessionId = this.data.sessionId;
  }

  public dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (file.size > 6291456) {
            popupNotification(
              'Error',
              `${file.name} is greater than 6 mb`,
              'error',
            );
            return;
          }
          this.routineImage.setValue(file);
          // (<FormArray>this.classroomPostForm.get('files')).push(
          //   new FormControl(file),
          // );
          // Here you can access the real file
          // console.log(droppedFile.relativePath, file);
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  onUpload() {
    this.sessionService
      .uploadRoutine(this.sessionId, this.routineImage.value)
      .subscribe(
        res => {
          popupNotification('Success', 'Routine Uploaded', 'success');
          location.reload();
          console.log(res);
        },
        err => {
          console.log(err);
          popupNotification('Error', 'Routine Uploaded', 'error');
        },
      );
    console.log('From Upload', this.routineImage.value);
  }
}

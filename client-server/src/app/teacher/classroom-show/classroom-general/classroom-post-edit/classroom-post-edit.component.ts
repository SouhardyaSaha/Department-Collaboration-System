import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ActivatedRouteSnapshot } from '@angular/router';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';
import { PostSubmitBody } from 'src/app/teacher/classroom/models/post.model';
import { ClassroomGeneralService } from '../classroom-general.service';
@Component({
  selector: 'app-classroom-post-edit',
  templateUrl: './classroom-post-edit.component.html',
  styleUrls: ['./classroom-post-edit.component.css'],
})
export class ClassroomPostEditComponent implements OnInit {
  classroomPostForm: FormGroup;
  isLoading: boolean = false;
  classroomId: number;
  // activatedRouteSnapshot: ActivatedRouteSnapshot;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private classroomGeneralService: ClassroomGeneralService,
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.classroomId = this.data.classroomId;
    // console.log(this.classroomId);
  }

  private formInit() {
    let content = '';

    this.classroomPostForm = new FormGroup({
      content: new FormControl(content, [Validators.required]),
      files: new FormArray([]),
    });
  }

  onSubmit() {
    let postBody: PostSubmitBody = this.classroomPostForm.value;
    console.log(this.classroomPostForm.value);
    this.isLoading = true;
    this.classroomGeneralService.addPost(this.classroomId, postBody).subscribe(
      res => {
        this.isLoading = false;
        console.log(res);
        // location.reload();
      },
      err => {
        this.isLoading = false;
        console.log(err);
      },
    );
  }

  public files: File[] = [];

  public dropped(files: NgxFileDropEntry[]) {
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
          (<FormArray>this.classroomPostForm.get('files')).push(
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
      console.log(this.classroomPostForm.value);
    }
  }

  public fileOver() {
    // console.log(event);
  }

  public fileLeave() {
    // console.log(event);
  }

  public removeFile(index) {
    (<FormArray>this.classroomPostForm.get('files')).removeAt(+index);
  }

  popNotification(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
}

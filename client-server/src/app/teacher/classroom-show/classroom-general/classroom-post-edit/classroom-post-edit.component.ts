import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
  NgxFileDropModule,
} from 'ngx-file-drop';

@Component({
  selector: 'app-classroom-post-edit',
  templateUrl: './classroom-post-edit.component.html',
  styleUrls: ['./classroom-post-edit.component.css'],
})
export class ClassroomPostEditComponent implements OnInit {
  classroomPostForm: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.formInit();
  }

  private formInit() {
    let post = '';

    this.classroomPostForm = new FormGroup({
      post: new FormControl(post, [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.classroomPostForm.value);
  }

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    // console.log(this.files);
    // this.files.
    this.files = this.files.concat(...files);
    // this.files = [...this.files, ...files];
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    // console.log(event);
  }

  public fileLeave(event) {
    // console.log(event);
  }

  public removeFile(file: NgxFileDropEntry) {
    let index = this.files.indexOf(file);
    if (index >= 0) this.files.splice(index, 1);
  }
}

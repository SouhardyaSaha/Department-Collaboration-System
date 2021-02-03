import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';

@Component({
  selector: 'app-classwork-edit',
  templateUrl: './classwork-edit.component.html',
  styleUrls: ['./classwork-edit.component.css'],
})
export class ClassworkEditComponent implements OnInit {
  assignmentForm: FormGroup;
  task_type: number;
  minDate: Date;
  constructor() {}

  ngOnInit(): void {
    this.formInit();
    this.minDate = new Date();
  }

  private formInit() {
    let details = '';
    let deadlineDate = new Date();
    let total_marks = '';
    this.task_type = 1;

    this.assignmentForm = new FormGroup({
      details: new FormControl(details, [Validators.required]),
      deadlineDate: new FormControl(deadlineDate, [Validators.required]),
      total_marks: new FormControl(total_marks, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      task_type: new FormControl(this.task_type, [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.assignmentForm.value);
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

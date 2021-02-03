import { Component, OnInit } from '@angular/core';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';

@Component({
  selector: 'app-classroom-classwork-details',
  templateUrl: './classroom-classwork-details.component.html',
  styleUrls: ['./classroom-classwork-details.component.css'],
})
export class ClassroomClassworkDetailsComponent implements OnInit {
  constructor() {}
  isStudent: boolean = true;
  ngOnInit(): void {}

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

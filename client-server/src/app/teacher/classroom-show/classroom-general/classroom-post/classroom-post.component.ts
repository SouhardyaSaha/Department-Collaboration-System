import { Component, Input, OnInit } from '@angular/core';
import { FileBody, Post } from 'src/app/teacher/classroom/models/post.model';

@Component({
  selector: 'app-classroom-post',
  templateUrl: './classroom-post.component.html',
  styleUrls: ['./classroom-post.component.css'],
})
export class ClassroomPostComponent implements OnInit {
  constructor() {}
  @Input() post: Post;
  files: FileBody[];
  ngOnInit(): void {
    this.files = [];
    this.post.files.forEach(file => {
      if (file.is_image === '0') {
        this.files.push(file);
      }
    });
  }
  goto(uri) {
    window.open(
      uri,
      '_blank',
      'location=yes,height=570,width=520,scrollbars=yes,status=yes',
    );
    // window.location.href = uri;
  }
}

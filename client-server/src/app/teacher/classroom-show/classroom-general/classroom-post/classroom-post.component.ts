import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/teacher/classroom/models/post.model';

@Component({
  selector: 'app-classroom-post',
  templateUrl: './classroom-post.component.html',
  styleUrls: ['./classroom-post.component.css'],
})
export class ClassroomPostComponent implements OnInit {
  constructor() {}
  @Input() post: Post;
  ngOnInit(): void {}
  goto(uri) {
    window.open(
      uri,
      '_blank',
      'location=yes,height=570,width=520,scrollbars=yes,status=yes',
    );
    // window.location.href = uri;
  }
}

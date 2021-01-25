import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classroom-post-comment',
  templateUrl: './classroom-post-comment.component.html',
  styleUrls: ['./classroom-post-comment.component.css'],
})
export class ClassroomPostCommentComponent implements OnInit {
  commentPanelOpenState: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}

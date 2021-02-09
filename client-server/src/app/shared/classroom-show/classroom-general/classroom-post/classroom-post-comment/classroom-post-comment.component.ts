import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/shared/classroom/models/comment.model';
import { ClassroomGeneralService } from '../../classroom-general.service';

@Component({
  selector: 'app-classroom-post-comment',
  templateUrl: './classroom-post-comment.component.html',
  styleUrls: ['./classroom-post-comment.component.css'],
})
export class ClassroomPostCommentComponent implements OnInit {
  commentPanelOpenState: boolean = false;
  @Input() comments: Comment[];
  @Input() postId: number;
  classroomId: number;
  content: FormControl;
  isLoading: boolean = false;
  constructor(
    private classroomGeneralService: ClassroomGeneralService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.classroomId = this.route.snapshot.params['id'];
    let content = '';
    // console.log('comments', this.comments);
    this.content = new FormControl(content, Validators.required);
  }

  onAddComment() {
    // console.log(this.content.value);
    let comment = this.content.value;
    if (comment === '') return;
    this.classroomGeneralService
      .addPostComment(this.classroomId, this.postId, { content: comment })
      .subscribe(
        res => {
          this.isLoading = true;
          console.log(res);
          location.reload();
        },
        err => {
          this.isLoading = false;
          console.log(err);
        },
      );
  }
}

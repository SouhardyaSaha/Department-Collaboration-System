import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Comment } from 'src/app/shared/classroom/models/comment.model';
import { popupNotification } from 'src/app/shared/utils.class';
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

  user = null;
  constructor(
    private classroomGeneralService: ClassroomGeneralService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.classroomId = this.route.snapshot.params['id'];
    let content = '';
    this.authService.user.subscribe(user => {
      if (user) {
        this.user = user;
        // console.log(this.user.id, this.post.user.id);
      }
    });
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
          this.content.reset();
          this.isLoading = false;
          console.log(res);
          this.commentPanelOpenState = true;
          this.comments.push(res.data.comment);
          // location.reload();
        },
        err => {
          this.isLoading = false;
          console.log(err);
        },
      );
  }

  onDelete(comment: Comment) {
    this.classroomGeneralService
      .deletePostComment(this.classroomId, comment.postId, comment.id)
      .subscribe(
        res => {
          const index = this.comments.indexOf(comment);
          this.comments.splice(index, 1);
          popupNotification('Success', 'Successfully Deleted', 'success');
          console.log(res);
        },
        err => {
          popupNotification('Error', 'Error', 'error');
          console.log(err);
        },
      );
  }
}

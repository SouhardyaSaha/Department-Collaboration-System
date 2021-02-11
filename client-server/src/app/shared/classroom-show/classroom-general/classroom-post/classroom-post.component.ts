import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FileBody, Post } from 'src/app/shared/classroom/models/post.model';
import { popupNotification } from 'src/app/shared/utils.class';
import { ClassroomGeneralService } from '../classroom-general.service';

@Component({
  selector: 'app-classroom-post',
  templateUrl: './classroom-post.component.html',
  styleUrls: ['./classroom-post.component.css'],
})
export class ClassroomPostComponent implements OnInit {
  @Input() post: Post;
  user = null;
  files: FileBody[];
  constructor(
    private authService: AuthService,
    private generalService: ClassroomGeneralService,
  ) {}
  ngOnInit(): void {
    this.files = [];
    this.post.files.forEach(file => {
      if (file.is_image === '0') {
        this.files.push(file);
      }
    });

    this.authService.user.subscribe(user => {
      if (user) {
        this.user = user;
        console.log(this.user.id, this.post.user.id);
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

  onDelete() {
    this.generalService
      .deletePost(this.post.classroomId, this.post.id)
      .subscribe(
        res => {
          popupNotification('Success', 'Successfully Deleted', 'success');
          this.post = null;
          console.log(res);
        },
        err => {
          popupNotification('Error', 'Error', 'error');
          console.log(err);
        },
      );
  }
}

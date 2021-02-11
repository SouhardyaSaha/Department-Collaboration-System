import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { FileBody, Post } from 'src/app/shared/classroom/models/post.model';
import { popupNotification } from 'src/app/shared/utils.class';
import { ClassroomGeneralService } from '../classroom-general.service';
import { ClassroomPostEditComponent } from '../classroom-post-edit/classroom-post-edit.component';
import Swal from 'sweetalert2';
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
    public postEditDialog: MatDialog,
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
        // console.log(this.user.id, this.post.user.id);
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
    Swal.fire({
      title: 'Are you sure?',
      text: `You will not be able to recover this comment`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then(result => {
      if (result.value) {
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
        // Swal.fire('Deleted!', `Comment has been deleted.`, 'success');
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', `Comment  is safe :)`, 'error');
      }
    });
  }

  openPostEditDialog() {
    const dialogConfig: MatDialogConfig = {
      maxWidth: '90%',
      width: '700px',
      disableClose: true,
      data: {
        post: this.post,
      },
    };

    const dialogRef = this.postEditDialog.open(
      ClassroomPostEditComponent,
      dialogConfig,
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

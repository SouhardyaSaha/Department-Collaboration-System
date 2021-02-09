import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewSessionComponent } from './new-session/new-session.component';
import { SessionService } from './sessions.service';
import { SessionModel } from './sessions.model';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-sessions',
  templateUrl: './add-sessions.component.html',
  styleUrls: ['./add-sessions.component.css'],
})
export class AddSessionsComponent implements OnInit {
  sessionData: SessionModel[];
  private sessionSub: Subscription;
  constructor(
    private dialog: MatDialog,
    private sessionService: SessionService,
  ) {}

  ngOnInit(): void {
    this.sessionService.getSessionData();
    this.sessionSub = this.sessionService
      .getSessionUpdate()
      .subscribe((sessions: SessionModel[]) => {
        // console.log(response);
        this.sessionData = sessions;
      });
  }
  ngOnDestroy() {
    this.sessionSub.unsubscribe();
  }
  onCLick() {
    console.log('Add course pop-up');
    const dialogConfig = new MatDialogConfig();
    // let id = this.routines[index].id;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '350px';
    dialogConfig.data = { string: 'show' };
    this.dialog.open(NewSessionComponent, dialogConfig);
  }
  deleteById(session: SessionModel) {
    console.log(session);
    Swal.fire({
      title: 'Are you sure?',
      text: `You will not be able to recover this ${session.session} session!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then(result => {
      if (result.value) {
        this.sessionService.deleteSessionData(session.id);
        Swal.fire(
          'Deleted!',
          `Session ${session.session} has been deleted.`,
          'success',
        );
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          `Session ${session.session}  is safe :)`,
          'error',
        );
      }
    });
  }
}

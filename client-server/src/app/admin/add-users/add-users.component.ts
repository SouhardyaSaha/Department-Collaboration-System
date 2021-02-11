import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SessionResponseBody } from 'src/app/shared/classroom/models/session.model';
import { SessionService } from 'src/app/shared/classroom/session.service';
import { popupNotification } from 'src/app/shared/utils.class';
import { AdminService } from '../admin.service';
import { InvitationBody } from '../models/invitation.model';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css'],
})
export class AddUsersComponent implements OnInit {
  isLoading: boolean = false;
  emails = [];
  emailInput: FormControl;
  roleInput: FormControl;
  sessionInput: FormControl;
  sessions$: Observable<SessionResponseBody>;
  @ViewChild('fileInput') fileInputVariable: ElementRef;
  constructor(
    private sessionService: SessionService,
    private adminService: AdminService,
  ) {}

  ngOnInit(): void {
    this.emailInput = new FormControl(null, [
      Validators.required,
      Validators.email,
    ]);
    this.roleInput = new FormControl(null, Validators.required);
    this.sessionInput = new FormControl(null, Validators.required);

    this.sessions$ = this.sessionService.getSessions();
  }

  uploadExcel(e) {
    this.emails = [];
    try {
      import('xlsx').then(xlsx => {
        let workBook = null;
        let jsonData = null;
        const reader = new FileReader();
        // const file = ev.target.files[0];
        reader.onload = () => {
          const data = reader.result;
          workBook = xlsx.read(data, { type: 'binary' });
          jsonData = workBook.SheetNames.reduce((initial, name) => {
            const sheet = workBook.Sheets[name];
            initial[name] = xlsx.utils.sheet_to_json(sheet);
            return initial;
          }, {});
          let sheetData = jsonData[Object.keys(jsonData)[0]];
          console.log(sheetData);
          sheetData.forEach(element => {
            this.emails.push(element.Email);
          });
          console.log({ emails: this.emails });
        };
        reader.readAsBinaryString(e.target.files[0]);
      });
    } catch (e) {
      console.log('error', e);
    }
  }

  remove(email) {
    const index = this.emails.indexOf(email);
    this.emails.splice(index, 1);
  }

  addEmail() {
    if (!this.emailInput.valid) return;
    this.emails.push(this.emailInput.value);
    this.emailInput.reset();
  }

  onReset() {
    this.emails = [];
    this.emailInput.reset();
    this.roleInput.reset();
    this.sessionInput.reset();
    this.fileInputVariable.nativeElement.value = '';
  }

  sendInvitation() {
    this.isLoading = true;

    if (
      this.emails.length === 0 ||
      this.roleInput.invalid ||
      (this.roleInput.value === 'student' && this.sessionInput.invalid)
    )
      return;
    let invitationBody: InvitationBody = {
      emails: this.emails,
      role: this.roleInput.value,
      sessionId: this.sessionInput.value,
    };
    this.onReset();
    // console.log(invitationBody);

    this.adminService.sendInvitationMail(invitationBody).subscribe(
      res => {
        console.log(res);
        this.isLoading = true;
        popupNotification('Success', 'Emails Sent!', 'success');
      },
      err => {
        this.isLoading = true;
        popupNotification('Error', 'Error!', 'error');
      },
    );
  }
}

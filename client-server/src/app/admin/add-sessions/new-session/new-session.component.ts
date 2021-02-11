import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { SessionService } from '../sessions.service';
import { SessionModel } from '../sessions.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.css'],
})
export class NewSessionComponent implements OnInit {
  isLoading = false;
  isIt = false;
  sessionForm: FormGroup;
  sessionData: SessionModel;
  spinner = false;
  @ViewChild('closeButton') close: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
  ) {}

  ngOnInit(): void {
    this.sessionForm = this.formBuilder.group({
      session: ['', [Validators.required]],
    });
  }
  submit() {
    this.isLoading = true;
    console.log(this.sessionForm.value.session);
    this.sessionData = {
      session: this.sessionForm.value.session,
    };
    this.sessionService.postSessionData(this.sessionData).subscribe(
      responseData => {
        console.log(responseData.data.session.id);
        this.isLoading = false;
        this.sweetAlert(
          'Success',
          `Session ${this.sessionData.session} has been added`,
          'success',
        );
        // this.close.nativeElement.click();
        this.isIt = true;
      },
      err => {
        console.log(err);
        this.isLoading = false;
        this.sweetAlert(
          'Error!',
          `Session ${this.sessionData.session} already added`,
          'error',
        );
      },
    );
  }
  sweetAlert(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }
}

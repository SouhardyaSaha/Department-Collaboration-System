import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { popupNotification } from 'src/app/shared/utils.class';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {
  authenticationForm: FormGroup;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formInit();
  }

  private formInit() {
    this.authenticationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.authenticationForm.invalid) {
      return;
    }
    const { email } = this.authenticationForm.value;

    this.isLoading = true;
    this.authService.requestResetPassword(email).subscribe(
      res => {
        console.log(res);
        // this.error = null
        this.isLoading = false;
        // this.router.navigate(['/teacher']);
        popupNotification('Email Sent!', 'Success', 'success');
      },
      errorMessage => {
        // this.error = errorMessage
        this.isLoading = false;
        popupNotification('Error', 'Error', 'error');
      },
    );

    this.authenticationForm.reset();
  }

  onClose() {
    // this.error = null
  }
}

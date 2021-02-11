import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormBuilder,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { popupNotification } from 'src/app/shared/utils.class';
import { AuthService } from '../auth.service';
import { RegistrationBody } from '../user.model';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl,
    form: FormGroupDirective | NgForm,
  ): boolean {
    return form.hasError('misMatch');
  }
}

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  authenticationForm: FormGroup;
  profileGroup: FormGroup;
  isLoading: boolean = false;
  isTeacher: boolean;
  errorMatcher = new CrossFieldErrorMatcher();
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  private formInit() {
    this.authenticationForm = this.formBuilder.group(
      {
        password: new FormControl(null, [
          Validators.required,
          // Validators.minLength(6),
        ]),
        confirm_password: new FormControl(null, [
          Validators.required,
          // Validators.minLength(6),
        ]),
      },
      { validator: this.PasswordValidator },
    );
  }

  PasswordValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirm_password = control.get('confirm_password');

    if (password.pristine || confirm_password.pristine) {
      return null;
    }

    return password &&
      confirm_password &&
      password.value !== confirm_password.value
      ? { misMatch: true }
      : null;
  }

  onSubmit() {
    // console.log(this.authenticationForm);

    if (this.authenticationForm.invalid) {
      return;
    }

    let token: string = this.route.snapshot.params['token'];
    // console.log(token);

    this.isLoading = true;
    this.authService
      .resetPassword(token, this.authenticationForm.value)
      .subscribe(
        res => {
          console.log(res);
          // this.error = null
          popupNotification('Success', 'Success', 'success');
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
        },
        err => {
          console.log(err);

          popupNotification('Error', 'Error', 'error');
          this.isLoading = false;
        },
      );

    this.authenticationForm.reset();
  }

  onClose() {
    // this.error = null
  }
}

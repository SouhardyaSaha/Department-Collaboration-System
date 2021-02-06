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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  authenticationForm: FormGroup;
  profileGroup: FormGroup;
  isLoading: boolean = false;
  isTeacher: boolean;
  errorMatcher = new CrossFieldErrorMatcher();
  designations: string[] = [
    'LECTURER',
    'ASSISTANT PROFESSOR',
    'ASSOCIATE PROFESSOR',
    'PROFESSOR',
  ];
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.isTeacher = this.route.snapshot.params['role'] === 'teacher';
    this.formInit();
  }

  private formInit() {
    let profileGroupData;
    if (this.isTeacher) {
      profileGroupData = {
        designation: new FormControl(null, Validators.required),
      };
    } else {
      profileGroupData = {
        registration: new FormControl(null, [Validators.required]),
      };
    }

    this.authenticationForm = this.formBuilder.group(
      {
        name: new FormControl(null, Validators.required),
        // email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          // Validators.minLength(6),
        ]),
        confirm_password: new FormControl(null, [
          Validators.required,
          // Validators.minLength(6),
        ]),
        ...profileGroupData,
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
    // console.log(this.authenticationForm.value);

    if (this.authenticationForm.invalid) {
      return;
    }

    let profile;
    const registration = this.authenticationForm.value.registration;
    if (registration) {
      profile = {
        registration,
      };
    } else {
      profile = {
        designation: this.authenticationForm.value.designation.toLowerCase(),
      };
    }
    const { name, password } = this.authenticationForm.value;

    let token: string = this.route.snapshot.params['token'];
    let registrationBody: RegistrationBody = { name, password, profile };
    console.log(registrationBody, token);

    console.log(registrationBody);
    this.isLoading = true;
    this.authService.signUp(registrationBody, token).subscribe(
      res => {
        console.log(res);
        // this.error = null
        this.isLoading = false;
        this.router.navigate(['/teacher']);
      },
      () => {
        // this.error = errorMessage
        this.isLoading = false;
      },
    );

    this.authenticationForm.reset();
  }

  onClose() {
    // this.error = null
  }
}

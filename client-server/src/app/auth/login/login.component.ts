import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authenticationForm: FormGroup;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formInit();
  }

  private formInit() {
    this.authenticationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this.authenticationForm.invalid) {
      return;
    }
    const { email, password } = this.authenticationForm.value;

    this.isLoading = true;
    this.authService.logIn({ email, password }).subscribe(
      res => {
        console.log(res);
        // this.error = null
        this.isLoading = false;
        // this.router.navigate(['/teacher']);
      },
      errorMessage => {
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

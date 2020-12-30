import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './auth.service'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authenticationForm: FormGroup
  isLoginMode: boolean = true
  isLoading: boolean = false
  // error: string = null

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formInit()
  }

  private formInit() {
    this.authenticationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  // onSwitchMode() {
  //   this.isLoginMode = !this.isLoginMode
  // }

  private authObservalbe: Observable<any>

  onSubmit() {
    if (this.authenticationForm.invalid) {
      return
    }
    const { email, password } = this.authenticationForm.value

    this.isLoading = true
    if (this.isLoginMode) {
      this.authObservalbe = this.authService.logIn({ email, password })

    } else {
      this.authObservalbe = this.authService.signUp({ email, password })
    }

    this.authObservalbe.subscribe(
      res => {
        console.log(res)
        // this.error = null
        this.isLoading = false
        this.router.navigate(['/student'])
      },
      errorMessage => {
        // this.error = errorMessage
        this.isLoading = false
      }
    )

    this.authenticationForm.reset()
  }

  onClose() {
    // this.error = null
  }

}

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import {
  AuthResponseData,
  LoginBody,
  RegistrationBody,
  User,
} from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseURL = environment.serverURL;
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(registrationBody: RegistrationBody, token: string) {
    return this.http
      .post<AuthResponseData>(
        `${this.baseURL}/users/register/${token}`,
        registrationBody,
      )
      .pipe(
        tap(res => {
          console.log(res);
          const user = res.data.user;

          this.handleAuthenticatedUser(
            user.id,
            user.name,
            user.email,
            user.createdAt,
            user.updatedAt,
            user.role,
          );
        }),
        catchError(this.handleError),
      );
  }

  logIn(loginBody: LoginBody) {
    return this.http
      .post<AuthResponseData>(`${this.baseURL}/users/login`, loginBody)
      .pipe(
        tap(res => {
          console.log(res);
          const user = res.data.user;

          this.handleAuthenticatedUser(
            user.id,
            user.name,
            user.email,
            user.createdAt,
            user.updatedAt,
            user.role,
          );
        }),
        catchError(this.handleError),
      );
  }

  logout() {
    this.http.post(`${this.baseURL}/users/logout`, {}).subscribe(
      response => {
        console.log(response);

        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
      },
      error => console.log(error),
    );
  }

  private handleAuthenticatedUser(
    userId: number,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    role: string,
  ) {
    const firstCreatedAt = new Date(createdAt);
    const lastEditedAt = new Date(updatedAt);
    const user = new User(
      userId,
      name,
      email,
      firstCreatedAt,
      lastEditedAt,
      role,
    );

    localStorage.setItem('userData', JSON.stringify(user));

    this.user.next(user);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    let errorMessage = 'An unknown Error';
    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    }
    switch (error.error.error) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email Already in Use!';
        break;
      case 'Invalid Credentials':
        errorMessage = 'Invalid Credentials!';
        break;

      default:
        break;
    }
    return throwError(errorMessage);
  }
}

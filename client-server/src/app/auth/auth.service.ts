import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { Router } from '@angular/router';

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponseData {
  data: {
    user: {
      email: string;
      createdAt: string;
      updatedAt: string;
      id: string;
    };
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseURL = `http://localhost:3000`;
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(credentials: Credentials) {
    return (
      this.http
        // .post<AuthResponseData>(`${this.baseURL}/users`, credentials)
        .post<AuthResponseData>(`${this.baseURL}/users`, credentials)
        .pipe(
          tap(res => {
            console.log(res);
            const user = res.data.user;

            this.handleAuthenticatedUser(
              user.email,
              user.id,
              user.createdAt,
              user.updatedAt,
            );
          }),
          catchError(this.handleError),
        )
    );
  }

  logIn(credentials: Credentials) {
    return (
      this.http
        // .post<AuthResponseData>(`${this.baseURL}/users/login`, credentials)
        .post<AuthResponseData>(`${this.baseURL}/users/login`, credentials)
        .pipe(
          tap(res => {
            console.log(res);
            const user = res.data.user;

            this.handleAuthenticatedUser(
              user.email,
              user.id,
              user.createdAt,
              user.updatedAt,
            );
          }),
          catchError(this.handleError),
        )
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
    email: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
  ) {
    const firstCreatedAt = new Date(createdAt);
    const lastEditedAt = new Date(updatedAt);
    const user = new User(email, userId, firstCreatedAt, lastEditedAt);

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

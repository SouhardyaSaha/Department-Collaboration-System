import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { InvitationBody } from './models/invitation.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseURL = environment.serverURL;
  constructor(private http: HttpClient, private router: Router) {}

  sendInvitationMail(invitationBody: InvitationBody) {
    let url = `${this.baseURL}/users/invite`;
    return this.http.post(url, invitationBody);
  }
}

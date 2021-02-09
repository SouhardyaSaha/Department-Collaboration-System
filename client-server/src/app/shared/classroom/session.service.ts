import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SessionResponseBody } from './models/session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  baseURL: string = environment.serverURL;

  constructor(private http: HttpClient) {}

  getSessions() {
    return this.http.get<SessionResponseBody>(`${this.baseURL}/sessions`);
  }
}

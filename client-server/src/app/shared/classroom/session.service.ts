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

  uploadRoutine(sessionId, image) {
    let url = `${this.baseURL}/sessions/${sessionId}/upload-routine`;
    const submitData: FormData = new FormData();
    submitData.append('file', image);
    return this.http.patch(url, submitData);
  }

  getStudentSession() {
    return this.http.get(`${this.baseURL}/sessions/student`);
  }
}

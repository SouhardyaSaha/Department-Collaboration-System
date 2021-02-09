import { Injectable } from '@angular/core';
import { SessionModel } from './sessions.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private SessionData: SessionModel[] = [];
  private updateSession = new Subject<SessionModel[]>();
  constructor(private http: HttpClient) {}

  getSessionData() {
    this.http
      .get<{ status: string; data }>('http://localhost:3000/sessions')
      .subscribe(response => {
        // console.log(response.data.Sessions);
        // this.SessionData = response.data.Sessions;
        this.SessionData = response.data.sessions;
        // console.log(this.SessionData);
        this.updateSession.next([...this.SessionData]);
      });
  }
  getSessionUpdate() {
    return this.updateSession.asObservable();
  }
  postSessionData(data: SessionModel) {
    const postData: SessionModel = data;
    return this.http
      .post<{ status: string; data: { session: SessionModel } }>(
        'http://localhost:3000/sessions',
        postData,
      )
      .pipe(
        tap(responseData => {
          postData.id = responseData.data.session.id;
          this.SessionData.push(postData);
          console.log('Add Session: ', this.SessionData);
          this.updateSession.next([...this.SessionData]);
        }),
      );
  }
  updateSessionData(id, data: SessionModel) {}
  deleteSessionData(id) {
    this.http
      .delete('http://localhost:3000/sessions/' + id)
      .subscribe(responseData => {
        console.log(responseData);
        const UpdatedList = this.SessionData.filter(
          routine => routine.id !== id,
        );
        this.SessionData = UpdatedList;
        this.updateSession.next([...this.SessionData]);
      });
  }
}

import { Injectable } from '@angular/core';
import { RoutineData } from './routine.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RoutineService {
  private routineData: RoutineData[] = [];
  private routineDataById: RoutineData;
  private updateRoutine = new Subject<RoutineData[]>();
  private updateRoutineId = new Subject<RoutineData>();

  constructor(private http: HttpClient) {}

  getRoutineData() {
    this.http
      .get<{ msg: string; routines: RoutineData[] }>(
        'http://localhost:3000/routine',
      )
      .subscribe(data => {
        console.log(data);
        this.routineData = data.routines;
        console.log(data.routines);
        this.updateRoutine.next([...this.routineData]);
      });
  }

  updateRoutineDataById(id, routine: RoutineData) {
    const postRoutine: RoutineData = routine;
    this.http
      .put<{ message: string }>(
        'http://localhost:3000/routine/' + id,
        postRoutine,
      )
      .subscribe(responseData => {
        console.log(responseData.message);
        // this.routineData.push(postRoutine);

        const UpdatedList = [...this.routineData];
        const oldIndex = UpdatedList.findIndex(p => p.id === id);
        UpdatedList[oldIndex] = postRoutine;
        this.routineData = UpdatedList;

        // this.routineData = UpdatedList;
        console.log(this.routineData);
        this.updateRoutine.next([...this.routineData]);
      });
  }
  getRoutineUpdateById() {
    return this.updateRoutineId.asObservable();
  }

  getRoutineUpdate() {
    return this.updateRoutine.asObservable();
  }
  addRoutineData(routine: RoutineData) {
    const postRoutine: RoutineData = routine;
    // console.log("view "+postRoutine.courseTitle);
    this.http
      .post<{ message: string; id: number }>(
        'http://localhost:3000/routine',
        postRoutine,
      )
      .subscribe(responseData => {
        console.log(responseData.message, responseData.id);
        postRoutine.id = responseData.id;
        this.routineData.push(postRoutine);
        // console.log("Add Post: ",this.routineData);
        this.updateRoutine.next([...this.routineData]);
      });
  }

  deleteRoutineData(id: number) {
    this.http
      .delete('http://localhost:3000/routine/' + id)
      .subscribe(responseData => {
        console.log(responseData);
        const UpdatedList = this.routineData.filter(
          routine => routine.id !== id,
        );
        this.routineData = UpdatedList;
        this.updateRoutine.next([...this.routineData]);
      });
  }
}

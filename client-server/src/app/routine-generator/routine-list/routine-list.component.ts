import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutineService } from '../routine.service';
import { RoutineData } from '../routine.model';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RoutineEditComponent } from '../routine-edit/routine-edit.component';
@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.css'],
})
export class RoutineListComponent implements OnInit, OnDestroy {
  routines: RoutineData[] = [];
  private routineSub: Subscription;
  panelOpenState = false;
  loadingData = false;

  constructor(
    private routineService: RoutineService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadingData = true;
    this.routineService.getRoutineData();
    this.routineSub = this.routineService
      .getRoutineUpdate()
      .subscribe((routines: RoutineData[]) => {
        this.loadingData = false;
        this.routines = routines;
      });
    console.log('From List:', this.routines);
  }

  ngOnDestroy() {
    this.routineSub.unsubscribe();
  }
  onClickDelete(index) {
    console.log('delete', index, this.routines[index]);
    const id = this.routines[index].id;
    this.routineService.deleteRoutineData(id);
  }
  onClickEdit(index) {
    console.log('List-edit', index, this.routines[index].id);
    const dialogConfig = new MatDialogConfig();
    // let id = this.routines[index].id;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { index: index, routine: this.routines };
    this.dialog.open(RoutineEditComponent, dialogConfig);
  }
}

import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { AttendanceData } from '../attendance.model';
import { AttendanceService } from '../attendance.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-attendance-form',
  templateUrl: './attendance-form.component.html',
  styleUrls: ['./attendance-form.component.css'],
})
export class AttendanceFormComponent implements OnInit {
  attendanceData: AttendanceData;
  student_id_list: number[] = [];
  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.attendanceData = null;
  }

  displayedColumns: string[] = ['select', 'position', 'name'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
  takeAttendance() {
    // console.log('Submit is Clicked!');
    const numSelected = this.selection.selected.length;

    if (numSelected > 0) {
      for (let i = 0; i < numSelected; i++) {
        console.log(this.selection.selected[i].position);
        this.student_id_list.push(this.selection.selected[i].position);
      }
    } else {
      console.log('None is selected.');
    }
    console.log(this.student_id_list);
    this.attendanceData = {
      id: 1,
      class_id: 1,
      date: new Date(),
      student_id: this.student_id_list,
    };
    this.attendanceService.addAttendanceData(this.attendanceData);
    console.log(this.attendanceData);
    this.clearAttendance();
  }
  clearAttendance() {
    this.selection.clear();
  }
}

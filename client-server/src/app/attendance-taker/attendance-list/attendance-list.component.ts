import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IndividualAttendanceComponent } from '../individual-attendance/individual-attendance.component';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  absence: number;
  isPresent: boolean[];
}

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css'],
})
export class AttendanceListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'absence',
    'percentage',
    'isPresent',
    'actions',
  ];
  dataSource: MatTableDataSource<UserData>;
  dates: string[] = [];

  ngOnInit(): void {
    this.dates = ['12-01-20', '13-01-20', '15-01-20', '16-01-20', '19-01-20'];
  }
  constructor(private dialog: MatDialog) {
    // Create 100 users
    const users = Array.from([
      {
        id: '1',
        name: 'Kabil',
        progress: '45',
        absence: 5,
        isPresent: [true, false, true, true, false],
      },
      {
        id: '2',
        name: 'Kabl',
        progress: '45',
        absence: 5,
        isPresent: [false, false, true, false, false],
      },
      {
        id: '3',
        name: 'Abil',
        progress: '45',
        absence: 5,
        isPresent: [false, false, false, false, true],
      },
      {
        id: '4',
        name: 'Koil',
        progress: '45',
        absence: 5,
        isPresent: [true, true, true, false, true],
      },
      {
        id: '5',
        name: 'biil',
        progress: '45',
        absence: 5,
        isPresent: [false, false, true, true, true],
      },
    ]);

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }
  onDelete(id) {}
  onDetails(id) {
    // console.log(id);
    console.log('Details of id :' + id);
    const dialogConfig = new MatDialogConfig();
    // let id = this.routines[index].id;
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '60%';
    dialogConfig.data = { message: 'Individual Form', id: id };
    this.dialog.open(IndividualAttendanceComponent, dialogConfig);
  }
}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: 'black',
//   };
// }

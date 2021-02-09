import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface Data {
  date: string[];
  absent: boolean[];
}
@Component({
  selector: 'app-individual-attendance',
  templateUrl: './individual-attendance.component.html',
  styleUrls: ['./individual-attendance.component.css'],
})
export class IndividualAttendanceComponent implements OnInit {
  displayedColumns: string[] = ['date', 'absent'];
  dataSource: MatTableDataSource<Data>;
  records = 0;
  constructor() {}

  ngOnInit(): void {
    const date = ['12-01-20', '13-01-20', '15-01-20', '16-01-20', '19-01-20'];
    // const date = [];
    const absent = ['13-01-20', '19-01-20'];
    var index = 0;
    var is = [];
    for (let item of date) {
      // console.log(item, absent[index]);
      if (item === absent[index]) {
        is.push(false);
        index++;
      } else {
        is.push(true);
      }
    }
    const displayData = Array.from([
      {
        date: date,
        absent: is,
      },
    ]);
    this.dataSource = new MatTableDataSource(displayData);
    console.log(this.dataSource.data[0].date.length);
    this.records = this.dataSource.data[0].date.length;
  }
}

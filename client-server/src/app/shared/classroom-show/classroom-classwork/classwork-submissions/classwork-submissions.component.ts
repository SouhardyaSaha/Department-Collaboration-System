import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Submission } from 'src/app/shared/classroom/models/classwork.model';

@Component({
  selector: 'app-classwork-submissions',
  templateUrl: './classwork-submissions.component.html',
  styleUrls: ['./classwork-submissions.component.css'],
})
export class ClassworkSubmissionsComponent implements OnInit, AfterViewInit {
  submissions: Submission[];
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Submission>;

  displayedColumns: string[] = [
    // 'select',
    // 'user_img_uri',
    'name',
    'registration',
    'assignment',
    'submitted at',
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.submissions = this.data.submissions;
    console.log('form submission compotnent', this.submissions);
    this.dataSource = new MatTableDataSource(this.submissions);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goto(uri) {
    window.open(
      uri,
      '_blank',
      'location=yes,height=570,width=520,scrollbars=yes,status=yes',
    );
    // window.location.href = uri;
  }
}

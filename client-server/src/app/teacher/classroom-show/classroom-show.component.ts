import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-classroom-show',
  templateUrl: './classroom-show.component.html',
  styleUrls: ['./classroom-show.component.css'],
})
export class ClassroomShowComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup;
  ngOnInit(): void {}

  asyncTabs: Observable<ExampleTab[]>;

  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: 'General', content: 'Content 1' },
          { label: 'Class', content: 'Content 2' },
          // { label: 'Third', content: 'Content 3' },
        ]);
      }, 0);
    });
  }

  onAddPost() {
    console.log(this.tabGroup.selectedIndex);
  }
}

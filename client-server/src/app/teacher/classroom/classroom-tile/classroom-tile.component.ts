import { Component, Input, OnInit } from '@angular/core';
import { Classroom } from '../models/classroom.model';

@Component({
  selector: 'app-classroom-tile',
  templateUrl: './classroom-tile.component.html',
  styleUrls: ['./classroom-tile.component.css'],
})
export class ClassroomTileComponent implements OnInit {
  @Input() classroom: Classroom;
  constructor() {}

  ngOnInit(): void {
    console.log(this.classroom);
  }
}

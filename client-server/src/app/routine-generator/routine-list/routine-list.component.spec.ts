import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineListComponent } from './routine-list.component';

describe('RoutineListComponent', () => {
  let component: RoutineListComponent;
  let fixture: ComponentFixture<RoutineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutineListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

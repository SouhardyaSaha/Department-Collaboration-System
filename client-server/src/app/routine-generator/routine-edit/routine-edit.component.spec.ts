import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineEditComponent } from './routine-edit.component';

describe('RoutineEditComponent', () => {
  let component: RoutineEditComponent;
  let fixture: ComponentFixture<RoutineEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutineEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

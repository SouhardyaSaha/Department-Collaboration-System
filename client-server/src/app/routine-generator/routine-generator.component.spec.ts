import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutineGeneratorComponent } from './routine-generator.component';

describe('RoutineGeneratorComponent', () => {
  let component: RoutineGeneratorComponent;
  let fixture: ComponentFixture<RoutineGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutineGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

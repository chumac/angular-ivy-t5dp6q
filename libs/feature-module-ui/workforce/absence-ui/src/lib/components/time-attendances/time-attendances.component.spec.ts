import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAttendancesComponent } from './timeAttendances.component';

describe('TimeAttendancesComponent', () => {
  let component: TimeAttendancesComponent;
  let fixture: ComponentFixture<TimeAttendancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeAttendancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

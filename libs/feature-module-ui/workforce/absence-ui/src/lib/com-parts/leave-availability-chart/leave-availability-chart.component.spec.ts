import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveAvailabilityChartComponent } from './leave-availability-chart.component';

describe('LeaveAvailabilityChartComponent', () => {
  let component: LeaveAvailabilityChartComponent;
  let fixture: ComponentFixture<LeaveAvailabilityChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveAvailabilityChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveAvailabilityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

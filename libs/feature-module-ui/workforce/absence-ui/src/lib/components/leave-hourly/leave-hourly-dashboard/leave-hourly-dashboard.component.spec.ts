import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveHourlyDashboardComponent } from './leave-hourly-dashboard.component';

describe('LeaveHourlyDashboardComponent', () => {
  let component: LeaveHourlyDashboardComponent;
  let fixture: ComponentFixture<LeaveHourlyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveHourlyDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveHourlyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

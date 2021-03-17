import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveHourlyApplyComponent } from './leave-hourly-apply.component';

describe('LeaveHourlyApplyComponent', () => {
  let component: LeaveHourlyApplyComponent;
  let fixture: ComponentFixture<LeaveHourlyApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveHourlyApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveHourlyApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

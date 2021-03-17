import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApplyComponent } from './leave-apply.component';

describe('LeaveApplyContinueComponent', () => {
  let component: LeaveApplyComponent;
  let fixture: ComponentFixture<LeaveApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

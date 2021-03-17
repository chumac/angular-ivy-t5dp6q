import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveReturnComponent } from './leave-cancel-approved.component';

describe('LeaveReturnContinueComponent', () => {
  let component: LeaveReturnComponent;
  let fixture: ComponentFixture<LeaveReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveProrationComponent } from './leave-proration.component';

describe('LeaveProrationComponent', () => {
  let component: LeaveProrationComponent;
  let fixture: ComponentFixture<LeaveProrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveProrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveProrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

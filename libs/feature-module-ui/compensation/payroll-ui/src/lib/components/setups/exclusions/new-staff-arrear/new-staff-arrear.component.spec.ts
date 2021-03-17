import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStaffArrearComponent } from './new-staff-arrear.component';

describe('NewStaffArrearComponent', () => {
  let component: NewStaffArrearComponent;
  let fixture: ComponentFixture<NewStaffArrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStaffArrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStaffArrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDataHomeComponent } from './employee-data-home.component';

describe('EmployeeDataHomeComponent', () => {
  let component: EmployeeDataHomeComponent;
  let fixture: ComponentFixture<EmployeeDataHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDataHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDataHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDataComponent } from './employee-data.component';

describe('EmployeeDataComponent', () => {
  let component: EmployeeDataComponent;
  let fixture: ComponentFixture<EmployeeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeArSummaryPageComponent } from './employee-ar-summary-page.component';

describe('EmployeeArSummaryPageComponent', () => {
  let component: EmployeeArSummaryPageComponent;
  let fixture: ComponentFixture<EmployeeArSummaryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeArSummaryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeArSummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSummaryPageComponent } from './employee-summary-page.component';

describe('EmployeeSummaryPageComponent', () => {
  let component: EmployeeSummaryPageComponent;
  let fixture: ComponentFixture<EmployeeSummaryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeSummaryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

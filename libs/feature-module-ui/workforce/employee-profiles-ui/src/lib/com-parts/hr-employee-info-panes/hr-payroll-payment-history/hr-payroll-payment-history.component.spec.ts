import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPayrollPaymentHistoryComponent } from './hr-payroll-payment-history.component';

describe('HrPayrollPaymentHistoryComponent', () => {
  let component: HrPayrollPaymentHistoryComponent;
  let fixture: ComponentFixture<HrPayrollPaymentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPayrollPaymentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPayrollPaymentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPayrollPaymentHistoryViewerComponent } from './hr-payroll-payment-history-viewer.component';

describe('HrPayrollPaymentHistoryViewerComponent', () => {
  let component: HrPayrollPaymentHistoryViewerComponent;
  let fixture: ComponentFixture<HrPayrollPaymentHistoryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPayrollPaymentHistoryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPayrollPaymentHistoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

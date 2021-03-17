import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPayrollPaymentHistoryEditorComponent } from './hr-payroll-payment-history-editor.component';

describe('HrPayrollPaymentHistoryEditorComponent', () => {
  let component: HrPayrollPaymentHistoryEditorComponent;
  let fixture: ComponentFixture<HrPayrollPaymentHistoryEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrPayrollPaymentHistoryEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrPayrollPaymentHistoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCurrencyEditorComponent } from './payment-currency-editor.component';

describe('PaymentCurrencyEditorComponent', () => {
  let component: PaymentCurrencyEditorComponent;
  let fixture: ComponentFixture<PaymentCurrencyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentCurrencyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCurrencyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

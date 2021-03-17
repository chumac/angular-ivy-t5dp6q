import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCurrenciesComponent } from './payment-currencies.component';

describe('PaymentCurrenciesComponent', () => {
  let component: PaymentCurrenciesComponent;
  let fixture: ComponentFixture<PaymentCurrenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentCurrenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

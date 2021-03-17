import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentViewerComponent } from './payment-viewer.component';

describe('PaymentViewerComponent', () => {
  let component: PaymentViewerComponent;
  let fixture: ComponentFixture<PaymentViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

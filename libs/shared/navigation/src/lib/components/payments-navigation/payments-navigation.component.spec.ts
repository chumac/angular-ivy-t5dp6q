import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsNavigationComponent } from './payments-navigation.component';

describe('PaymentsNavigationComponent', () => {
  let component: PaymentsNavigationComponent;
  let fixture: ComponentFixture<PaymentsNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

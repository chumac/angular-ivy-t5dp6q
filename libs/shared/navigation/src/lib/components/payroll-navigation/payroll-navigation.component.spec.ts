import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollNavigationComponent } from './payroll-navigation.component';

describe('PayrollNavigationComponent', () => {
  let component: PayrollNavigationComponent;
  let fixture: ComponentFixture<PayrollNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

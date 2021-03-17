import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableDeductionTransactionsComponent } from './variable-deduction-transactions.component';

describe('VariableDeductionTransactionsComponent', () => {
  let component: VariableDeductionTransactionsComponent;
  let fixture: ComponentFixture<VariableDeductionTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableDeductionTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableDeductionTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableAllowanceTransactionsComponent } from './variable-allowance-transactions.component';

describe('VariableAllowanceTransactionsComponent', () => {
  let component: VariableAllowanceTransactionsComponent;
  let fixture: ComponentFixture<VariableAllowanceTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableAllowanceTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableAllowanceTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

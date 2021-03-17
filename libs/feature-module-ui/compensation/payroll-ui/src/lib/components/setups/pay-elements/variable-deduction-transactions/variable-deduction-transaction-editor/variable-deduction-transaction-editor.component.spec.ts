import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableDeductionTransactionEditorComponent } from './variable-deduction-transaction-editor.component';

describe('VariableDeductionTransactionEditorComponent', () => {
  let component: VariableDeductionTransactionEditorComponent;
  let fixture: ComponentFixture<VariableDeductionTransactionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableDeductionTransactionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableDeductionTransactionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableAllowanceTransactionEditorComponent } from './variable-allowance-transaction-editor.component';

describe('VariableAllowanceTransactionEditorComponent', () => {
  let component: VariableAllowanceTransactionEditorComponent;
  let fixture: ComponentFixture<VariableAllowanceTransactionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableAllowanceTransactionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableAllowanceTransactionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrWorkflowTransactionEditorComponent } from './hr-workflow-transaction-editor.component';

describe('HrWorkflowTransactionEditorComponent', () => {
  let component: HrWorkflowTransactionEditorComponent;
  let fixture: ComponentFixture<HrWorkflowTransactionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrWorkflowTransactionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrWorkflowTransactionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

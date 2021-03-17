import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStepsEditorComponent } from './workflowSteps-editor.component';

describe('WorkflowStepsEditorComponent', () => {
  let component: WorkflowStepsEditorComponent;
  let fixture: ComponentFixture<WorkflowStepsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStepsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStepsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

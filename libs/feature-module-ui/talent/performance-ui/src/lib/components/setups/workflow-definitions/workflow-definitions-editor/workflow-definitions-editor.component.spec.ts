import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDefinitionsEditorComponent } from './workflowDefinitions-editor.component';

describe('WorkflowDefinitionsEditorComponent', () => {
  let component: WorkflowDefinitionsEditorComponent;
  let fixture: ComponentFixture<WorkflowDefinitionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowDefinitionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDefinitionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

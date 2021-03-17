import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDefinitionEditorComponent } from './workflow-definition-editor.component';

describe('WorkflowDefinitionEditorComponent', () => {
  let component: WorkflowDefinitionEditorComponent;
  let fixture: ComponentFixture<WorkflowDefinitionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowDefinitionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDefinitionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

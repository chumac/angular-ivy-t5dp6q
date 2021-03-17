import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowMapEditorComponent } from './workflow-map-editor.component';

describe('WorkflowMapEditorComponent', () => {
  let component: WorkflowMapEditorComponent;
  let fixture: ComponentFixture<WorkflowMapEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowMapEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowMapEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowMapAltEditorComponent } from './workflow-map-alt-editor.component';

describe('WorkflowMapAltEditorComponent', () => {
  let component: WorkflowMapAltEditorComponent;
  let fixture: ComponentFixture<WorkflowMapAltEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowMapAltEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowMapAltEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

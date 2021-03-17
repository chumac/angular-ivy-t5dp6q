import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDefinitionsViewerComponent } from './workflowDefinitions-viewer.component';

describe('WorkflowDefinitionsViewerComponent', () => {
  let component: WorkflowDefinitionsViewerComponent;
  let fixture: ComponentFixture<WorkflowDefinitionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowDefinitionsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDefinitionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

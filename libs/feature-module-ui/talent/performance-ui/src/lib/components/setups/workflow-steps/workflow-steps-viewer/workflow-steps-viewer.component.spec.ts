import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStepsViewerComponent } from './workflowSteps-viewer.component';

describe('WorkflowStepsViewerComponent', () => {
  let component: WorkflowStepsViewerComponent;
  let fixture: ComponentFixture<WorkflowStepsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStepsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStepsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

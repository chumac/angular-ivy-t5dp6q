import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDetailsViewerComponent } from './workflow-details-viewer.component';

describe('WorkflowDetailsViewerComponent', () => {
  let component: WorkflowDetailsViewerComponent;
  let fixture: ComponentFixture<WorkflowDetailsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowDetailsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDetailsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

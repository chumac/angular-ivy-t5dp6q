import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDefinitionsComponent } from './workflowDefinitions.component';

describe('WorkflowDefinitionsComponent', () => {
  let component: WorkflowDefinitionsComponent;
  let fixture: ComponentFixture<WorkflowDefinitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowDefinitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDefinitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDefinitionComponent } from './workflow-definition.component';

describe('WorkflowDefinitionComponent', () => {
  let component: WorkflowDefinitionComponent;
  let fixture: ComponentFixture<WorkflowDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

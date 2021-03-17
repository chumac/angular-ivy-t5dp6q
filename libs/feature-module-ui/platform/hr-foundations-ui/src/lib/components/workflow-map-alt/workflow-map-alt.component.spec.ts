import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowMapAltComponent } from './workflow-map-alt.component';

describe('WorkflowMapAltComponent', () => {
  let component: WorkflowMapAltComponent;
  let fixture: ComponentFixture<WorkflowMapAltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowMapAltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowMapAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

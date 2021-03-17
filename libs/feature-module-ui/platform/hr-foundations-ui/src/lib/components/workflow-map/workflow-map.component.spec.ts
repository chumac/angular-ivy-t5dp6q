import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowMapComponent } from './workflow-map.component';

describe('WorkflowMapComponent', () => {
  let component: WorkflowMapComponent;
  let fixture: ComponentFixture<WorkflowMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

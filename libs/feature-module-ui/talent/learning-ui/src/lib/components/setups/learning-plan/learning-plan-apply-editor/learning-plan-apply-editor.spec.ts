import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPlanViewerComponent } from './learning-plan-viewer.component';

describe('LearningPlanViewerComponent', () => {
  let component: LearningPlanViewerComponent;
  let fixture: ComponentFixture<LearningPlanViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningPlanViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningPlanViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningPlanComponent } from './learning-plan.component';

describe('LearningPlanComponent', () => {
  let component: LearningPlanComponent;
  let fixture: ComponentFixture<LearningPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

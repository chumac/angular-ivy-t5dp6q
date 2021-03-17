import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamFeedbackReviewComponent } from './team-feedback-review.component';

describe('TeamFeedbackReviewComponent', () => {
  let component: TeamFeedbackReviewComponent;
  let fixture: ComponentFixture<TeamFeedbackReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamFeedbackReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFeedbackReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

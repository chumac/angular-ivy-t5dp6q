import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackQuestionsComponent } from './feedbackQuestions.component';

describe('FeedbackQuestionsComponent', () => {
  let component: FeedbackQuestionsComponent;
  let fixture: ComponentFixture<FeedbackQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

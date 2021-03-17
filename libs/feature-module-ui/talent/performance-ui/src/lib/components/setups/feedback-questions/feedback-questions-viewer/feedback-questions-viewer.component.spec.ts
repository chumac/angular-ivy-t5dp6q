import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackQuestionsViewerComponent } from './feedbackQuestions-viewer.component';

describe('FeedbackQuestionsViewerComponent', () => {
  let component: FeedbackQuestionsViewerComponent;
  let fixture: ComponentFixture<FeedbackQuestionsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackQuestionsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackQuestionsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

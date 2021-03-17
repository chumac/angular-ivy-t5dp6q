import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackQuestionsEditorComponent } from './feedbackQuestions-editor.component';

describe('FeedbackQuestionsEditorComponent', () => {
  let component: FeedbackQuestionsEditorComponent;
  let fixture: ComponentFixture<FeedbackQuestionsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackQuestionsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackQuestionsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackRatingsEditorComponent } from './feedbackRatings-editor.component';

describe('FeedbackRatingsEditorComponent', () => {
  let component: FeedbackRatingsEditorComponent;
  let fixture: ComponentFixture<FeedbackRatingsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackRatingsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackRatingsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

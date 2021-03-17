import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailFeedbackFormsEditorComponent } from './event-detail-feedback-forms-editor.component';

describe('EventDetailFeedbackFormsEditorComponent', () => {
  let component: EventDetailFeedbackFormsEditorComponent;
  let fixture: ComponentFixture<EventDetailFeedbackFormsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailFeedbackFormsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailFeedbackFormsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

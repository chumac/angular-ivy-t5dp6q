import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailFeedbackFormsViewerComponent } from './event-detail-feedback-forms-viewer.component';

describe('EventDetailFeedbackFormsViewerComponent', () => {
  let component: EventDetailFeedbackFormsViewerComponent;
  let fixture: ComponentFixture<EventDetailFeedbackFormsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailFeedbackFormsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailFeedbackFormsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

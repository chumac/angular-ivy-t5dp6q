import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailFeedbackFormsComponent } from './event-detail-feedback-forms.component';

describe('EventDetailFeedbackFormsComponent', () => {
  let component: EventDetailFeedbackFormsComponent;
  let fixture: ComponentFixture<EventDetailFeedbackFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailFeedbackFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailFeedbackFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

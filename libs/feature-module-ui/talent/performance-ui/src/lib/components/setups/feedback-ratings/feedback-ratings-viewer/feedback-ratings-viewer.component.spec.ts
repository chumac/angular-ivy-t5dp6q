import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackRatingsViewerComponent } from './feedbackRatings-viewer.component';

describe('FeedbackRatingsViewerComponent', () => {
  let component: FeedbackRatingsViewerComponent;
  let fixture: ComponentFixture<FeedbackRatingsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackRatingsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackRatingsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

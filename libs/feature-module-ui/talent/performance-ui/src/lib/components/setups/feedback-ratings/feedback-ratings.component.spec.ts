import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackRatingsComponent } from './feedbackRatings.component';

describe('FeedbackRatingsComponent', () => {
  let component: FeedbackRatingsComponent;
  let fixture: ComponentFixture<FeedbackRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

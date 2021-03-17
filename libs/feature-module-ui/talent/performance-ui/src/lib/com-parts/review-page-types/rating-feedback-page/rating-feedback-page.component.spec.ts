import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingFeedbackPageComponent } from './rating-feedback-page.component';

describe('RatingFeedbackPageComponent', () => {
  let component: RatingFeedbackPageComponent;
  let fixture: ComponentFixture<RatingFeedbackPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingFeedbackPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingFeedbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

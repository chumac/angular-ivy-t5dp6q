import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingFeedbackRowTemplateComponent } from './rating-feedback-row-template.component';

describe('RatingFeedbackRowTemplateComponent', () => {
  let component: RatingFeedbackRowTemplateComponent;
  let fixture: ComponentFixture<RatingFeedbackRowTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingFeedbackRowTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingFeedbackRowTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

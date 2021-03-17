import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerSummaryPageComponent } from './reviewer-summary-page.component';

describe('ReviewerSummaryPageComponent', () => {
  let component: ReviewerSummaryPageComponent;
  let fixture: ComponentFixture<ReviewerSummaryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewerSummaryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerSummaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

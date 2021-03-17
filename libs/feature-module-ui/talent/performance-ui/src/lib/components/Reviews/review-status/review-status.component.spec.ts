import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStatusComponent } from './review-status.component';

describe('ReviewStatusComponent', () => {
  let component: ReviewStatusComponent;
  let fixture: ComponentFixture<ReviewStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewStatusComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

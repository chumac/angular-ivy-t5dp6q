import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewProgressComponent } from './review-progress.component';

describe('ReviewProgressComponent', () => {
  let component: ReviewProgressComponent;
  let fixture: ComponentFixture<ReviewProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

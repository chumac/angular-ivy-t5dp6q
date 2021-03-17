import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeSixtyRatingPageComponent } from './three-sixty-rating-page.component';

describe('ThreeSixtyRatingPageComponent', () => {
  let component: ThreeSixtyRatingPageComponent;
  let fixture: ComponentFixture<ThreeSixtyRatingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeSixtyRatingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeSixtyRatingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeSixtyRatingRowTemplateComponent } from './three-sixty-rating-row-template.component';

describe('ThreeSixtyRatingRowTemplateComponent', () => {
  let component: ThreeSixtyRatingRowTemplateComponent;
  let fixture: ComponentFixture<ThreeSixtyRatingRowTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeSixtyRatingRowTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeSixtyRatingRowTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

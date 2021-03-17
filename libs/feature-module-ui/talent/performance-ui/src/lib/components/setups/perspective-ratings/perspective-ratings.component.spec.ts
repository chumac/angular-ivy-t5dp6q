import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerspectiveRatingsComponent } from './perspectiveRatings.component';

describe('PerspectiveRatingsComponent', () => {
  let component: PerspectiveRatingsComponent;
  let fixture: ComponentFixture<PerspectiveRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerspectiveRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerspectiveRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

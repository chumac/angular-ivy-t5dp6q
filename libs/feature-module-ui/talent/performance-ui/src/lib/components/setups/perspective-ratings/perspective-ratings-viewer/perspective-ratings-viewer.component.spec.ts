import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerspectiveRatingsViewerComponent } from './perspectiveRatings-viewer.component';

describe('PerspectiveRatingsViewerComponent', () => {
  let component: PerspectiveRatingsViewerComponent;
  let fixture: ComponentFixture<PerspectiveRatingsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerspectiveRatingsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerspectiveRatingsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

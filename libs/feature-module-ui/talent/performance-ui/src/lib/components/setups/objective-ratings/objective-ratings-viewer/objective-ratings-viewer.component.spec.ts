import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveRatingsViewerComponent } from './objectiveRatings-viewer.component';

describe('ObjectiveRatingsViewerComponent', () => {
  let component: ObjectiveRatingsViewerComponent;
  let fixture: ComponentFixture<ObjectiveRatingsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveRatingsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveRatingsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

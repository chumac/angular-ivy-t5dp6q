import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveRatingsComponent } from './objectiveRatings.component';

describe('ObjectiveRatingsComponent', () => {
  let component: ObjectiveRatingsComponent;
  let fixture: ComponentFixture<ObjectiveRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

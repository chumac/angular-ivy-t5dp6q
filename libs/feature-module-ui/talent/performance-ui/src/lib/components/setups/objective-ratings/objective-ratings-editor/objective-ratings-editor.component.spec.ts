import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveRatingsEditorComponent } from './objectiveRatings-editor.component';

describe('ObjectiveRatingsEditorComponent', () => {
  let component: ObjectiveRatingsEditorComponent;
  let fixture: ComponentFixture<ObjectiveRatingsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveRatingsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveRatingsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

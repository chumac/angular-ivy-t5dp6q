import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerspectiveRatingsEditorComponent } from './perspectiveRatings-editor.component';

describe('PerspectiveRatingsEditorComponent', () => {
  let component: PerspectiveRatingsEditorComponent;
  let fixture: ComponentFixture<PerspectiveRatingsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerspectiveRatingsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerspectiveRatingsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

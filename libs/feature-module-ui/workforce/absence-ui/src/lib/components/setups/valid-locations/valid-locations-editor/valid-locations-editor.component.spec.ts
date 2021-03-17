import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidLocationsEditorComponent } from './validLocations-editor.component';

describe('ValidLocationsEditorComponent', () => {
  let component: ValidLocationsEditorComponent;
  let fixture: ComponentFixture<ValidLocationsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidLocationsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidLocationsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

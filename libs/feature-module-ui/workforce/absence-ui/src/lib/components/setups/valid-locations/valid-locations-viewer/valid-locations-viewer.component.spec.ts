import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidLocationsViewerComponent } from './validLocations-viewer.component';

describe('ValidLocationsViewerComponent', () => {
  let component: ValidLocationsViewerComponent;
  let fixture: ComponentFixture<ValidLocationsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidLocationsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidLocationsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

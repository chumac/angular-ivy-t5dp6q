import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidLocationsComponent } from './validLocations.component';

describe('ValidLocationsComponent', () => {
  let component: ValidLocationsComponent;
  let fixture: ComponentFixture<ValidLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

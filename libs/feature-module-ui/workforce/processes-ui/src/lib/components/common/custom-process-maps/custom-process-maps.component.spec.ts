import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProcessMapsComponent } from './customProcessMaps.component';

describe('CustomProcessMapsComponent', () => {
  let component: CustomProcessMapsComponent;
  let fixture: ComponentFixture<CustomProcessMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomProcessMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomProcessMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProcessMapsViewerComponent } from './customProcessMaps-viewer.component';

describe('CustomProcessMapsViewerComponent', () => {
  let component: CustomProcessMapsViewerComponent;
  let fixture: ComponentFixture<CustomProcessMapsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomProcessMapsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomProcessMapsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

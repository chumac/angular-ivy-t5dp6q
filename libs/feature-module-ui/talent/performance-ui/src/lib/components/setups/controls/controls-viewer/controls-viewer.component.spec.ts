import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsViewerComponent } from './controls-viewer.component';

describe('ControlsViewerComponent', () => {
  let component: ControlsViewerComponent;
  let fixture: ComponentFixture<ControlsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetsViewerComponent } from './time-sheets-viewer.component';

describe('TimeSheetsViewerComponent', () => {
  let component: TimeSheetsViewerComponent;
  let fixture: ComponentFixture<TimeSheetsViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetsViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAttendancesViewerComponent } from './timeAttendances-viewer.component';

describe('TimeAttendancesViewerComponent', () => {
  let component: TimeAttendancesViewerComponent;
  let fixture: ComponentFixture<TimeAttendancesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeAttendancesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAttendancesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

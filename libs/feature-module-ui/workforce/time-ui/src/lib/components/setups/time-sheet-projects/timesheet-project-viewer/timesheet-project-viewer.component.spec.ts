import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetProjectViewerComponent } from './timesheet-project-viewer.component';

describe('TimesheetProjectViewerComponent', () => {
  let component: TimesheetProjectViewerComponent;
  let fixture: ComponentFixture<TimesheetProjectViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetProjectViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetProjectViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

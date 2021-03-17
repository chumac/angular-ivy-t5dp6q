import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetProjectEditorComponent } from './timesheet-project-editor.component';

describe('TimesheetProjectEditorComponent', () => {
  let component: TimesheetProjectEditorComponent;
  let fixture: ComponentFixture<TimesheetProjectEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetProjectEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetProjectEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

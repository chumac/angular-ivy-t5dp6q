import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAttendancesEditorComponent } from './timeAttendances-editor.component';

describe('TimeAttendancesEditorComponent', () => {
  let component: TimeAttendancesEditorComponent;
  let fixture: ComponentFixture<TimeAttendancesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeAttendancesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAttendancesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

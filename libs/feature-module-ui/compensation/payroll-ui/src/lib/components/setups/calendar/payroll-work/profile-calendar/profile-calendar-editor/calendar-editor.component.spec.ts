import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEditorComponent } from './calendar-editor.component';

describe('CalendarEditorComponent', () => {
  let component: CalendarEditorComponent;
  let fixture: ComponentFixture<CalendarEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

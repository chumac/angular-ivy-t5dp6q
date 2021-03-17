import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetsEditorComponent } from './time-sheets-editor.component';

describe('TimeSheetsEditorComponent', () => {
  let component: TimeSheetsEditorComponent;
  let fixture: ComponentFixture<TimeSheetsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSheetsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

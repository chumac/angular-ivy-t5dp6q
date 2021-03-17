import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayManagementEditorComponent } from './holiday-management-editor.component';

describe('HolidayManagementEditorComponent', () => {
  let component: HolidayManagementEditorComponent;
  let fixture: ComponentFixture<HolidayManagementEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayManagementEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayManagementEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

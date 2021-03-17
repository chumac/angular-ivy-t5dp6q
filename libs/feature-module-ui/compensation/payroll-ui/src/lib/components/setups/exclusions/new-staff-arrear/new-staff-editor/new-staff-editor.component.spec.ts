import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStaffEditorComponent } from './new-staff-editor.component';

describe('NewStaffEditorComponent', () => {
  let component: NewStaffEditorComponent;
  let fixture: ComponentFixture<NewStaffEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStaffEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStaffEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

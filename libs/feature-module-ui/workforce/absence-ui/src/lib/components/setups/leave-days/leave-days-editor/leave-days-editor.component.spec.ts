import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDaysEditorComponent } from './leave-days-editor.component';

describe('LeaveDaysEditorComponent', () => {
  let component: LeaveDaysEditorComponent;
  let fixture: ComponentFixture<LeaveDaysEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveDaysEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveDaysEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

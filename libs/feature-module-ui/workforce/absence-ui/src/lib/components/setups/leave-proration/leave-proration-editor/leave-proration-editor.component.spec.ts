import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveProrationEditorComponent } from './leave-proration-editor.component';

describe('LeaveProrationEditorComponent', () => {
  let component: LeaveProrationEditorComponent;
  let fixture: ComponentFixture<LeaveProrationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveProrationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveProrationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

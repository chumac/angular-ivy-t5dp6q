import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveDefinitionEditorComponent } from './leave-definition-editor.component';

describe('LeaveDefinitionEditorComponent', () => {
  let component: LeaveDefinitionEditorComponent;
  let fixture: ComponentFixture<LeaveDefinitionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveDefinitionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveDefinitionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

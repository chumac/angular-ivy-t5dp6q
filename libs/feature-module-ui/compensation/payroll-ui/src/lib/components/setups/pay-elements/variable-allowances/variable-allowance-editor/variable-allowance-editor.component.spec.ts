import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableAllowanceEditorComponent } from './variable-allowance-editor.component';

describe('VariableAllowanceEditorComponent', () => {
  let component: VariableAllowanceEditorComponent;
  let fixture: ComponentFixture<VariableAllowanceEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableAllowanceEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableAllowanceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

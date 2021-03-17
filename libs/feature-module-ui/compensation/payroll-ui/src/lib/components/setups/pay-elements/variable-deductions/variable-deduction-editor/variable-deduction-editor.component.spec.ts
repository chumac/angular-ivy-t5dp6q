import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableDeductionEditorComponent } from './variable-deduction-editor.component';

describe('VariableDeductionEditorComponent', () => {
  let component: VariableDeductionEditorComponent;
  let fixture: ComponentFixture<VariableDeductionEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableDeductionEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableDeductionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
